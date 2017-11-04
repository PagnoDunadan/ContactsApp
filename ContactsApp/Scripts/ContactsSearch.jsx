const panelCustom = {
    width: '400px',
    margin: '25px auto 25px auto',
};

var Contact = React.createClass({
    render: function () {
        return (
            <tr>
                <td>
                    <p>{this.props.ContactFirstName} {this.props.ContactLastName}</p>
                    <p>{this.props.ContactDefaultNumber}</p>
                </td>
            </tr>
        );
    }
});

var ContactsTable = React.createClass({
    loadContactsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ contacts: data });
        }.bind(this);
        xhr.send();
    },
    getInitialState: function () {
        return { contacts: [], search: '' };
    },
    componentDidMount: function () {
        this.loadContactsFromServer();
        window.setInterval(this.loadContactsFromServer, this.props.pollInterval);
    },
    handleSearchChange: function (e) {
        this.setState({ search: e.target.value });
    },
    render: function () {
        var filteredContacts = this.state.contacts;
        var search = this.state.search;
        for (var i = 0; i < this.state.contacts.length; i++) {
            filteredContacts = filteredContacts.filter(function (contact) {
                return (contact.ContactFirstName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    || (contact.ContactLastName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    || ((contact.ContactFirstName + contact.ContactLastName).toLowerCase().indexOf(search.toLowerCase().replace(/\s+/g, '')) !== -1)
                    || ((contact.ContactLastName + contact.ContactFirstName).toLowerCase().indexOf(search.toLowerCase().replace(/\s+/g, '')) !== -1)
                    || (contact.ContactDefaultNumber.toString().indexOf(search.toString()) !== -1);
            });
        }
        var contactNodes = filteredContacts.map(function (contact) {
            return (
                <Contact key={contact.ContactID} ContactFirstName={contact.ContactFirstName} ContactLastName={contact.ContactLastName} ContactDefaultNumber={contact.ContactDefaultNumber} />
            );
        });
        return (
            <div style={panelCustom}>
                <input type="text" placeholder="Search" value={this.state.search} onChange={this.handleSearchChange} className="form-control" />
                <br />
                <div className="panel panel-default">
                    <table className="contactsTable table table-hover">
                        <tbody>
                            {contactNodes}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <ContactsTable url="/Contacts/All" pollInterval={2000} />,
    document.getElementById('content')
);