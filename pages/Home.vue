<template>
  <b-row class="m-5">
    <b-col cols="12">
      <b-table
        striped
        hover
        selectable
        select-mode="single"
        selected-variant="success"
        :items="contacts"
        :fields="fields"
        @row-selected="contactSelected">
      </b-table>
    </b-col>
    <b-col cols="12" class="align-middle">
      <b-button-group>
        <b-button variant="info">Add</b-button>
        <b-button v-if="this.isRowSelected" variant="success">Edit</b-button>
        <b-button v-if="this.isRowSelected" variant="danger">Delete</b-button>
      </b-button-group>
    </b-col>
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
          sortable: true
        }
      ],
      contacts: [],
      isRowSelected : false
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
            actions: '<span>something!</span>'
          });
        });
        this.contacts = filteredContacts;
      })
      .catch((res) => {
        // ...
      });
    },
    contactSelected(row) {
      row = row[0];

      if(row === null || row === undefined || row === []) {
        this.isRowSelected = false;
      }
      else {
        this.isRowSelected = true;
      }
    }
  },
  created() {
    this.getContacts();
  }
}
</script>
