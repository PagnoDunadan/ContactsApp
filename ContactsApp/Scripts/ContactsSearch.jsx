﻿var Contact = React.createClass({
    getInitialState: function () {
        return {
            showEditForm: false,
            ContactID: this.props.ContactID,
            ContactFirstName: (this.props.ContactFirstName ? this.props.ContactFirstName : ""),
            ContactLastName: this.props.ContactLastName,
            ContactAddress: (this.props.ContactAddress ? this.props.ContactAddress : ""),
            ContactEmail: (this.props.ContactEmail ? this.props.ContactEmail : ""),
            ContactDefaultNumber: this.props.ContactDefaultNumber,
            ContactDefaultNumberType: (this.props.ContactDefaultNumberType ? this.props.ContactDefaultNumberType : "Mobile"),
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.ContactID != nextProps.ContactID) {
            this.setState({ ContactID: nextProps.ContactID });
        };
        if (this.props.ContactFirstName != nextProps.ContactFirstName) {
            this.setState({ ContactFirstName: nextProps.ContactFirstName });
        };
        if (this.props.ContactLastName != nextProps.ContactLastName) {
            this.setState({ ContactLastName: nextProps.ContactLastName });
        };
        if (this.props.ContactAddress != nextProps.ContactAddress) {
            this.setState({ ContactAddress: nextProps.ContactAddress });
        };
        if (this.props.ContactEmail != nextProps.ContactEmail) {
            this.setState({ ContactEmail: nextProps.ContactEmail });
        };
        if (this.props.ContactDefaultNumber != nextProps.ContactDefaultNumber) {
            this.setState({ ContactDefaultNumber: nextProps.ContactDefaultNumber });
        };
        if (this.props.ContactDefaultNumberType != nextProps.ContactDefaultNumberType) {
            this.setState({ ContactDefaultNumberType: nextProps.ContactDefaultNumberType });
        };
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
    handleShowEditForm: function () {
        this.setState({ showEditForm: !this.state.showEditForm });
    },
    handleDelete: function () {
        var ContactID = this.props.ContactID;
        this.props.onContactDelete({ ContactID });
    },
    handleResetClick: function () {
        this.setState({
            ContactFirstName: (this.props.ContactFirstName ? this.props.ContactFirstName : ""),
            ContactLastName: this.props.ContactLastName,
            ContactAddress: (this.props.ContactAddress ? this.props.ContactAddress : ""),
            ContactEmail: (this.props.ContactEmail ? this.props.ContactEmail : ""),
            ContactDefaultNumber: this.props.ContactDefaultNumber,
            ContactDefaultNumberType: (this.props.ContactDefaultNumberType ? this.props.ContactDefaultNumberType : "Mobile"),
        });
    },
    handleCancelClick: function () {
        this.handleResetClick();
        this.setState({ showEditForm: false });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var ContactID = this.props.ContactID;
        var ContactFirstName = this.state.ContactFirstName.trim();
        var ContactLastName = this.state.ContactLastName.trim();
        var ContactAddress = this.state.ContactAddress.trim();
        var ContactEmail = this.state.ContactEmail.trim();
        var ContactDefaultNumber = this.state.ContactDefaultNumber.trim();
        var ContactDefaultNumberType = this.state.ContactDefaultNumberType.trim();
        // TODO: Input validation
        if (!ContactLastName || !ContactDefaultNumber) {
            alert("ContactLastName and ContactDefaultNumber cannot be null");
            return;
        };
        if (ContactEmail && ContactEmail.match(/^.+@.+$/) == null) {
            alert("Invalid e-mail format");
            return;
        };
        if (ContactDefaultNumber.match(/^\+?[0-9]+$/) == null) {
            alert('ContactDefaultNumber can only contain numbers. Can start with "+"');
            return;
        };

        this.props.onContactEdit({
            ContactID,
            ContactFirstName, ContactLastName,
            ContactAddress, ContactEmail,
            ContactDefaultNumber, ContactDefaultNumberType,
        });
        this.setState({ showEditForm: false });
    },
    render: function () {
        var iconLink;
        switch (this.props.ContactDefaultNumberType) {
            case "Mobile":
                iconLink = "https://cdn2.iconfinder.com/data/icons/facebook-svg-icons-1/64/mobileicon-24.png";
                break;
            case "Landline":
                iconLink = "https://cdn2.iconfinder.com/data/icons/snipicons/500/phone-old-24.png";
                break;
            case "Fax":
                iconLink = "https://cdn2.iconfinder.com/data/icons/UII_Icons/24x24/fax.png";
                break;
            default:
                iconLink = "https://cdn2.iconfinder.com/data/icons/snipicons/500/phone-24.png";
        }
        return (
            <tr className="contactRow">
                <td className="contactTd displayBlock">
                    <a href={this.props.detailsUrl + this.props.ContactID} className="contactLink">
                    <p>{this.props.ContactFirstName} {this.props.ContactLastName}</p>
                    <p><img src={iconLink} width="24px" height="24px" /> {this.props.ContactDefaultNumber}</p>
                    </a>
                    <button className="btn btn-primary btn-sm menuButtonEdit" onClick={this.handleShowEditForm}><span className="glyphicon glyphicon-edit"></span> Edit</button>
                    <button className="btn btn-danger btn-sm menuButtonDelete" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash"></span> Delete</button>
                </td>
                <td className={this.state.showEditForm ? 'displayBlock noBorder' : 'displayNone'}>
                    <form onSubmit={this.handleSubmit}>
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
                        <select className="form-control" value={this.state.ContactDefaultNumberType} onChange={this.handleContactDefaultNumberTypeChange}>
                            <option value="Mobile">Mobile</option>
                            <option value="Landline">Landline</option>
                            <option value="Fax">Fax</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="button" value="Reset" className="btn btn-default buttonWidth33" onClick={this.handleResetClick} />
                        <input type="button" value="Cancel" className="btn btn-default buttonWidth33" onClick={this.handleCancelClick} />
                        <input type="submit" value="Submit" className="btn btn-primary buttonWidth33" />
                    </form>
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
            ContactDefaultNumber: '', ContactDefaultNumberType: 'Mobile',
        };
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
    handleShowContactFormClick: function () {
        this.setState({ showContactForm: !this.state.showContactForm });
    },
    handleResetClick: function () {
        this.setState({
            ContactFirstName: '', ContactLastName: '',
            ContactAddress: '', ContactEmail: '',
            ContactDefaultNumber: '', ContactDefaultNumberType: 'Mobile',
        });
    },
    handleCancelClick: function () {
        this.handleResetClick();
        this.setState({ showContactForm: false });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var ContactFirstName = this.state.ContactFirstName.trim();
        var ContactLastName = this.state.ContactLastName.trim();
        var ContactAddress = this.state.ContactAddress.trim();
        var ContactEmail = this.state.ContactEmail.trim();
        var ContactDefaultNumber = this.state.ContactDefaultNumber.trim();
        var ContactDefaultNumberType = this.state.ContactDefaultNumberType.trim();
        // TODO: Input validation
        if (!ContactLastName || !ContactDefaultNumber) {
            alert("ContactLastName and ContactDefaultNumber cannot be null");
            return;
        }
        if (ContactEmail && ContactEmail.match(/^.+@.+$/) == null) {
            alert("Invalid e-mail format");
            return;
        };
        if (ContactDefaultNumber.match(/^\+?[0-9]+$/) == null) {
            alert('ContactDefaultNumber can only contain numbers. Can start with "+"');
            return;
        };

        this.props.onContactSubmit({
            ContactFirstName, ContactLastName,
            ContactAddress, ContactEmail,
            ContactDefaultNumber, ContactDefaultNumberType,
        });
        this.setState({
            ContactFirstName: '', ContactLastName: '',
            ContactAddress: '', ContactEmail: '',
            ContactDefaultNumber: '', ContactDefaultNumberType: 'Mobile',
            showContactForm: false,
        });
    },
    render: function () {
        return (
            <div>
                <button className="btn btn-success" onClick={this.handleShowContactFormClick}>Show Contact Form</button>
                <div className={this.state.showContactForm ? 'contactModal' : 'displayNone'}>
                    <h1 className="contactTitle">Add Form</h1>
                    <br />
                    <form className={this.state.showContactForm ? '' : 'displayNone'} onSubmit={this.handleSubmit}>
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
                        <select className="form-control" value={this.state.ContactDefaultNumberType} onChange={this.handleContactDefaultNumberTypeChange}>
                            <option value="Mobile">Mobile</option>
                            <option value="Landline">Landline</option>
                            <option value="Fax">Fax</option>
                            <option value="Other">Other</option>
                        </select>
                        <br />
                        <input type="button" value="Reset" className="btn btn-default buttonWidth33" onClick={this.handleResetClick} />
                        <input type="button" value="Cancel" className="btn btn-default buttonWidth33" onClick={this.handleCancelClick} />
                        <input type="submit" value="Submit" className="btn btn-primary buttonWidth33" />
                    </form>
                </div>
                <div className={this.state.showContactForm ? 'contactModalBackdrop' : 'displayNone'} onClick={this.handleCancelClick} />
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
    handleContactEdit: function (contact) {
        var data = new FormData();
        data.append('ContactID', contact.ContactID);
        data.append('ContactFirstName', contact.ContactFirstName);
        data.append('ContactLastName', contact.ContactLastName);
        data.append('ContactAddress', contact.ContactAddress);
        data.append('ContactEmail', contact.ContactEmail);
        data.append('ContactDefaultNumber', contact.ContactDefaultNumber);
        data.append('ContactDefaultNumberType', contact.ContactDefaultNumberType);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.editUrl + contact.ContactID, true);
        xhr.onload = function () {
            this.loadContactsFromServer();
        }.bind(this);
        xhr.send(data);
    },
    handleContactDelete: function (contact) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.deleteUrl + contact.ContactID, true);
        xhr.onload = function () {
            this.loadContactsFromServer();
        }.bind(this);
        xhr.send();
    },
    handleSearchChange: function (e) {
        this.setState({ search: e.target.value });
    },
    render: function () {
        var filteredContacts = this.state.contacts;
        var search = this.state.search.trim().split(" ", 2);
        for (var i = 0; i < this.state.contacts.length; i++) {
            filteredContacts = filteredContacts.filter(function (contact) {
                if (contact.ContactFirstName != null) {
                    if (search.length == 1) {
                        return contact.ContactFirstName.toLowerCase().indexOf(search[0].toLowerCase()) !== -1
                            || contact.ContactLastName.toLowerCase().indexOf(search[0].toLowerCase()) !== -1
                            || contact.ContactDefaultNumber.toString().indexOf(search[0].toString()) !== -1;
                    }
                    else {
                        return (contact.ContactFirstName.toLowerCase().indexOf(search[0].toLowerCase()) !== -1
                            && contact.ContactLastName.toLowerCase().indexOf(search[1].toLowerCase()) !== -1)
                            || (contact.ContactLastName.toLowerCase().indexOf(search[0].toLowerCase()) !== -1
                            && contact.ContactFirstName.toLowerCase().indexOf(search[1].toLowerCase()) !== -1);
                    };
                }
                else {
                    if (search.length == 1) {
                        return (contact.ContactLastName.toLowerCase().indexOf(search[0].toLowerCase()) !== -1)
                            || (contact.ContactDefaultNumber.toString().indexOf(search[0].toString()) !== -1);
                    }
                    else return null;
                };
            });
        }
        var detailsUrl = this.props.detailsUrl;
        var onContactEdit = this.handleContactEdit;
        var onContactDelete = this.handleContactDelete;
        var contactNodes = filteredContacts.map(function (contact) {
            return (
                <Contact detailsUrl={detailsUrl}
                    onContactEdit={onContactEdit}
                    onContactDelete={onContactDelete}
                    key={contact.ContactID}
                    ContactID={contact.ContactID}
                    ContactFirstName={contact.ContactFirstName}
                    ContactLastName={contact.ContactLastName}
                    ContactAddress={contact.ContactAddress}
                    ContactEmail={contact.ContactEmail}
                    ContactDefaultNumber={contact.ContactDefaultNumber}
                    ContactDefaultNumberType={contact.ContactDefaultNumberType} />
            );
        });
        return (
            <div className="panelCustom">
                <input type="text" placeholder="Search" className="form-control"
                    value={this.state.search} onChange={this.handleSearchChange} />
                <br />
                <ContactForm onContactSubmit={this.handleContactSubmit} />
                <br />
                <div className="panel panel-default">
                    <table className="table table-hover">
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
    <ContactsTable url="/Contacts/All" detailsUrl="/Contacts/Edit/" submitUrl="/Contacts/Create" editUrl="/Contacts/Edit/" deleteUrl="/Contacts/Delete/" pollInterval={2000} />,
    document.getElementById('content')
);
