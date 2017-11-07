const panelCustom = {
    width: '400px',
    margin: '25px auto 25px auto',
};

const maxPossibleWidth = {
    width: '100%',
};

const contactLink = {
    width: '100%',
    height: '100%',
    display: 'block',
    textDecoration: 'none',
    color: 'black',
};

const hidden = {
    display: 'none',
};

var Contact = React.createClass({
    render: function () {
        return (
            <tr>
                <td style={maxPossibleWidth}>
                    <a href={'/Contacts/Details/'+this.props.ContactID} style={contactLink}>
                    <p>{this.props.ContactFirstName} {this.props.ContactLastName}</p>
                    <p>{this.props.ContactDefaultNumber}</p>
                    </a>
                </td>
                <td>
                    <button className="btn btn-primary btn-sm">Edit</button>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        );
    }
});

var ContactForm = React.createClass({
    getInitialState: function () {
        return {
            showContactForm: false,
            ContactFirstName: '', ContactLastName: '',
            ContactAddress: '', ContactEmail: '',
            ContactDefaultNumber: '', ContactDefaultNumberType: '',
        };
    },
    showHideContactForm: function () {
        this.setState({ showContactForm: !this.state.showContactForm });
    },
    handleContactFirstNameChange: function (e) {
        this.setState({ ContactFirstName: e.target.value });
    },
    handleContactLastNameChange: function (e) {
        this.setState({ ContactLastName: e.target.value });
    },
    handleContactAddressChange: function (e) {
        this.setState({ ContactAddress: e.target.value });
    },
    handleContactEmailChange: function (e) {
        this.setState({ ContactEmail: e.target.value });
    },
    handleContactDefaultNumberChange: function (e) {
        this.setState({ ContactDefaultNumber: e.target.value });
    },
    handleContactDefaultNumberTypeChange: function (e) {
        this.setState({ ContactDefaultNumberType: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var ContactFirstName = this.state.ContactFirstName.trim();
        var ContactLastName = this.state.ContactLastName.trim();
        var ContactAddress = this.state.ContactAddress.trim();
        var ContactEmail = this.state.ContactEmail.trim();
        var ContactDefaultNumber = this.state.ContactDefaultNumber.trim();
        var ContactDefaultNumberType = this.state.ContactDefaultNumberType.trim();
        if (!ContactLastName || !ContactDefaultNumber) {
            return;
        }
        this.props.onContactSubmit({
            ContactFirstName: ContactFirstName, ContactLastName: ContactLastName,
            ContactAddress: ContactAddress, ContactEmail: ContactEmail,
            ContactDefaultNumber: ContactDefaultNumber, ContactDefaultNumberType: ContactDefaultNumberType,
        });
        this.setState({
            ContactFirstName: '', ContactLastName: '',
            ContactAddress: '', ContactEmail: '',
            ContactDefaultNumber: '', ContactDefaultNumberType: '',
        });
    },
    render: function () {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.showHideContactForm}>Show Contact Form</button>
                <form className={this.state.showContactForm ? '' : 'hidden'} onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="ContactFirstName" className="form-control"
                        value={this.state.ContactFirstName} onChange={this.handleContactFirstNameChange} />
                    <input type="text" placeholder="ContactLastName *" className="form-control"
                        value={this.state.ContactLastName} onChange={this.handleContactLastNameChange} />
                    <input type="text" placeholder="ContactAddress" className="form-control"
                        value={this.state.ContactAddress} onChange={this.handleContactAddressChange} />
                    <input type="text" placeholder="ContactEmail" className="form-control"
                        value={this.state.ContactEmail} onChange={this.handleContactEmailChange} />
                    <input type="text" placeholder="ContactDefaultNumber *" className="form-control"
                        value={this.state.ContactDefaultNumber} onChange={this.handleContactDefaultNumberChange} />
                    <input type="text" placeholder="ContactDefaultNumberType" className="form-control"
                        value={this.state.ContactDefaultNumberType} onChange={this.handleContactDefaultNumberTypeChange} />
                    <input type="submit" value="Post" className="btn btn-success" />
                </form>
            </div>
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
    handleContactSubmit: function (contact) {
        var data = new FormData();
        data.append('ContactFirstName', contact.ContactFirstName);
        data.append('ContactLastName', contact.ContactLastName);
        data.append('ContactAddress', contact.ContactAddress);
        data.append('ContactEmail', contact.ContactEmail);
        data.append('ContactDefaultNumber', contact.ContactDefaultNumber);
        data.append('ContactDefaultNumberType', contact.ContactDefaultNumberType);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadContactsFromServer();
        }.bind(this);
        xhr.send(data);
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
                <Contact key={contact.ContactID}
                    ContactID={contact.ContactID}
                    ContactFirstName={contact.ContactFirstName}
                    ContactLastName={contact.ContactLastName}
                    ContactDefaultNumber={contact.ContactDefaultNumber} />
            );
        });
        return (
            <div style={panelCustom}>
                <input type="text" placeholder="Search" className="form-control"
                    value={this.state.search} onChange={this.handleSearchChange} />
                <br />
                <ContactForm onContactSubmit={this.handleContactSubmit} />
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
    <ContactsTable url="/Contacts/All" submitUrl="/Contacts/Create" pollInterval={2000} />,
    document.getElementById('content')
);