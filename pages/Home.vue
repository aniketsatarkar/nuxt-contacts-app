<template>
  <b-row class="m-5">
    <b-col cols="6">
      <h3>Contacts</h3>
    </b-col>
    <b-col col-6 class="d-flex justify-content-end">
      <b-button size="sm" class="mr-1 ml-1" variant="info" @click="add">Add</b-button>
      <b-button size="sm" class="mr-1 ml-1" v-if="this.isRowSelected" variant="success" @click="edit">Edit</b-button>
      <b-button size="sm" class="ml-1" v-if="this.isRowSelected" variant="danger" @click="archive">Delete</b-button>
    </b-col>
    <b-col cols="12" class="mt-3">
      <b-table
        striped
        hover
        selectable
        id="contacts-table"
        :per-page="pagination.perpage"
        :current-page="pagination.page"
        select-mode="single"
        selected-variant="success"
        :items="contacts"
        :fields="fields"
        @row-selected="contactSelected">
      </b-table>
    </b-col>
    <b-col col-12 class="d-flex justify-content-center">
      <b-pagination
        v-model="pagination.page"
        :total-rows="pagination.total"
        :per-page="pagination.perpage"
        aria-controls="contacts-table">
      </b-pagination>
    </b-col>

    <!-- modal -->
    <b-modal ref="modal" ok-title="Save" @ok="save">
      <b-form>
        <b-form-group>
          <b-row>
            <b-col>
              <b-input v-model="contact.firstName" placeholder="First Name" type="text"></b-input>
            </b-col>
            <b-col>
              <b-input v-model="contact.lastName" placeholder="Last Name" type="text"></b-input>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group>
          <b-row>
            <b-col>
              <b-input v-model="contact.phone" placeholder="Phone" type="text">
              </b-input>
            </b-col>
            <b-col>
              <b-input v-model="contact.secondaryPhone" placeholder="Secondary Phone" type="text">
              </b-input>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group>
          <b-row>
            <b-col>
              <b-input v-model="contact.email" type="email" placeholder="Email"></b-input>
            </b-col>
          </b-row>
        </b-form-group>
      </b-form>
    </b-modal>

  </b-row>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'firstName',
          sortable: true
        },
        {
          key: 'lastName',
          sortable: true
        },
        {
          key: 'email',
          sortable: true
        },
        {
          key: 'phone',
          sortable: false
        }
      ],
      contacts: [],
      selected : null,
      isRowSelected : false,
      pagination :{
        page : 1,
        perpage: 5,
        total: 0
      },
      contact: {
        firstName: '',
        lastName: '',
        phone: '',
        secondaryPhone: '',
        email: ''
      }
    };
  },
  methods: {
    getContacts() {
      this.$axios({
        method: 'get',
        url: 'http://laravel.local/api/contact/list',
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('token')
        }
      })
      .then((res) => {
        const contacts = res.data.contacts;
        const filteredContacts = [];

        contacts.forEach((value, key) => {
          filteredContacts.push({
            id: value.id,
            firstName : value.firstName,
            lastName: value.lastName,
            email : value.email,
            phone: value.phone,
            secondaryPhone: value.secondaryPhone
          });
        });
        this.contacts = filteredContacts;
        this.pagination.total = contacts.length;
      })
      .catch((res) => {
        // ...
      })
    },
    contactSelected(row) {
      row = row[0];

      if(row === null || row === undefined || row === []) {
        this.isRowSelected = false;
      }
      else {
        this.selected = row;
        this.isRowSelected = true;
      }
    },
    add() {
      this.contact = {};
      this.$refs.modal.title = 'Add Contact';
      this.$refs.modal.show();
    },
    edit() {
      this.contact = this.selected;
      this.$refs.modal.title = "Edit Contact";
      this.$refs.modal.show();
    },
    archive() {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        if(value) {
          this.$axios({
            url: 'http://laravel.local/api/contact/delete',
            data: {
              id: this.selected.id
            },
            method: 'post',
            headers: {
              Authorization: 'Bearer ' + this.$cookies.get('token')
            }
          })
          .then(res => {
            if(res.status === 200) {
              this.getContacts();
            }
          })
          .catch(res => {
            console.log("ERROR : " + JSON.stringify(res));
          });
        }
      })
      .catch(err => {
        console.log("ERROR : " + JSON.stringify(err));
      })
    },
    save() {
      const isEdit = (this.contact.id !== undefined && this.contact.id !== null);
      const params = {
        method: 'POST',
        data: this.contact,
        headers: {
          Authorization: 'Bearer ' + this.$cookies.get('token')
        }
      };

      params.url = (isEdit)
        ? 'http://laravel.local/api/contact/update'
        : 'http://laravel.local/api/contact/store';

      this.$axios(params)
        .then(res => {
          if(res.status === 200) {
            this.getContacts();
            const msg = (isEdit)
              ? 'Contact Updated Succssfuly!'
              : 'Contact Added Succssfuly!';
            this.$bvToast.toast(msg, {
              title: 'Success!',
              autoHideDelay: 3000,
              variant: 'success'
            })
          }
        })
        .catch(res => {
          console.log("CATCH : " + JSON.stringify(res));
        });
    }
  },
  created() {
    this.getContacts();
  }
}
</script>
