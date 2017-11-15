var PhoneNumber = React.createClass({
    getInitialState: function () {
        return {
            showEditForm: false,
            PhoneNumberID: this.props.PhoneNumberID,
            PhoneNumberNumber: this.props.PhoneNumberNumber,
            PhoneNumberType: (this.props.PhoneNumberType ? this.props.PhoneNumberType : "Mobile"),
            ContactID: this.props.ContactID,
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.PhoneNumberID != nextProps.PhoneNumberID) {
            this.setState({ PhoneNumberID: nextProps.PhoneNumberID });
        };
        if (this.props.PhoneNumberNumber != nextProps.PhoneNumberNumber) {
            this.setState({ PhoneNumberNumber: nextProps.PhoneNumberNumber });
        };
        if (this.props.PhoneNumberType != nextProps.PhoneNumberType) {
            this.setState({ PhoneNumberType: nextProps.PhoneNumberType ? nextProps.PhoneNumberType : "Mobile" });
        };
        if (this.props.ContactID != nextProps.ContactID) {
            this.setState({ ContactID: nextProps.ContactID });
        };
    },
    handlePhoneNumberNumberChange: function (e) {
        this.setState({ PhoneNumberNumber: e.target.value });
    },
    handlePhoneNumberTypeChange: function (e) {
        this.setState({ PhoneNumberType: e.target.value });
    },
    handleSetAsDefault: function () {
        var PhoneNumberID = this.props.PhoneNumberID;
        var PhoneNumberNumber = this.props.PhoneNumberNumber;
        var PhoneNumberType = (this.props.PhoneNumberType ? this.props.PhoneNumberType : "Mobile");
        var ContactID = this.props.ContactID;

        this.props.onPhoneNumberSetAsDefault({
            PhoneNumberID, PhoneNumberNumber,
            PhoneNumberType, ContactID,
        });
    },
    handleShowEditForm: function () {
        this.setState({ showEditForm: !this.state.showEditForm });
    },
    handleDelete: function () {
        var PhoneNumberID = this.props.PhoneNumberID;
        this.props.onPhoneNumberDelete({ PhoneNumberID });
    },
    handleResetClick: function () {
        this.setState({
            PhoneNumberNumber: this.props.PhoneNumberNumber,
            PhoneNumberType: (this.props.PhoneNumberType ? this.props.PhoneNumberType : "Mobile"),
        });
    },
    handleCancelClick: function () {
        this.handleResetClick();
        this.setState({ showEditForm: false });
    },
    handleEdit: function (e) {
        e.preventDefault();
        var PhoneNumberID = this.props.PhoneNumberID;
        var PhoneNumberNumber = this.state.PhoneNumberNumber.trim();
        var PhoneNumberType = this.state.PhoneNumberType.trim();
        var ContactID = this.props.ContactID;
        if (!PhoneNumberNumber) {
            alert("PhoneNumberNumber cannot be null");
            return;
        };
        if (PhoneNumberNumber.match(/^\+?[0-9]+$/) == null) {
            alert('PhoneNumberNumber can only contain numbers. Can start with "+"');
            return;
        };

        this.props.onPhoneNumberEdit({
            PhoneNumberID, PhoneNumberNumber,
            PhoneNumberType, ContactID,
        });
        this.setState({ showEditForm: false });
    },
    render: function () {
        var iconLink;
        switch (this.props.PhoneNumberType) {
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
                <td className="contactTd">
                    <p><img src={iconLink} /> {this.props.PhoneNumberNumber}</p>
                    <form className={this.state.showEditForm ? '' : 'displayNone'} onSubmit={this.handleEdit}>
                        <input type="text" placeholder="PhoneNumberNumber" className="form-control"
                            value={this.state.PhoneNumberNumber} onChange={this.handlePhoneNumberNumberChange} />
                        <select className="form-control" value={this.state.PhoneNumberType} onChange={this.handlePhoneNumberTypeChange}>
                            <option value="Mobile">Mobile</option>
                            <option value="Landline">Landline</option>
                            <option value="Fax">Fax</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="button" value="Reset" className="btn btn-default buttonWidth33" onClick={this.handleResetClick} />
                        <input type="button" value="Cancel" className="btn btn-default buttonWidth33" onClick={this.handleCancelClick} />
                        <input type="submit" value="Submit" className="btn btn-primary buttonWidth33" />
                    </form>
                    <button className="btn btn-primary btn-sm menuButtonSetAsDefault" onClick={this.handleSetAsDefault}>Set as default</button>
                    <button className="btn btn-primary btn-sm menuButtonEdit" onClick={this.handleShowEditForm}><span className="glyphicon glyphicon-edit"></span> Edit</button>
                    <button className="btn btn-danger btn-sm menuButtonDelete" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash"></span> Delete</button>
                </td>
            </tr>
        );
    }
});

var PhoneNumberForm = React.createClass({
    getInitialState: function () {
        return {
            showPhoneNumberForm: false,
            PhoneNumberNumber: '', PhoneNumberType: 'Mobile',
        };
    },
    handlePhoneNumberNumberChange: function (e) {
        this.setState({ PhoneNumberNumber: e.target.value });
    },
    handlePhoneNumberTypeChange: function (e) {
        this.setState({ PhoneNumberType: e.target.value });
    },
    handleShowPhoneNumberFormClick: function () {
        this.setState({ showPhoneNumberForm: !this.state.showPhoneNumberForm });
    },
    handleResetClick: function () {
        this.setState({
            PhoneNumberNumber: '', PhoneNumberType: 'Mobile',
        });
    },
    handleCancelClick: function () {
        this.handleResetClick();
        this.setState({ showPhoneNumberForm: false });
    },
    handleCreate: function (e) {
        e.preventDefault();
        var PhoneNumberNumber = this.state.PhoneNumberNumber.trim();
        var PhoneNumberType = this.state.PhoneNumberType.trim();
        if (!PhoneNumberNumber) {
            alert("PhoneNumberNumber cannot be null");
            return;
        };
        if (PhoneNumberNumber.match(/^\+?[0-9]+$/) == null) {
            alert('PhoneNumberNumber can only contain numbers. Can start with "+"');
            return;
        };

        this.props.onPhoneNumberCreate({
            PhoneNumberNumber, PhoneNumberType,
        });
        this.setState({
            showPhoneNumberForm: false,
            PhoneNumberNumber: '', PhoneNumberType: 'Mobile',
        });
    },
    render: function () {
        return (
            <div>
                <button className="btn btn-success addNewPhoneNumberButton" onClick={this.handleShowPhoneNumberFormClick}> Add a new number </button>
                <div className={this.state.showPhoneNumberForm ? 'contactModal' : 'displayNone'}>
                    <h1 className="contactTitle">Add Form</h1>
                    <br />
                    <form className={this.state.showPhoneNumberForm ? '' : 'displayNone'} onSubmit={this.handleCreate}>
                        <input type="text" placeholder="PhoneNumberNumber *" className="form-control"
                            value={this.state.PhoneNumberNumber} onChange={this.handlePhoneNumberNumberChange} />
                        <select className="form-control" value={this.state.PhoneNumberType} onChange={this.handlePhoneNumberTypeChange}>
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
                <div className={this.state.showPhoneNumberForm ? 'contactModalBackdrop' : 'displayNone'} onClick={this.handleCancelClick} />
            </div>
        );
    }
});

var ContactModal = React.createClass({
    getInitialState: function () {
        return {
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
    handleResetClick: function () {
        this.setState({
            ContactID: this.props.ContactID,
            ContactFirstName: (this.props.ContactFirstName ? this.props.ContactFirstName : ""),
            ContactLastName: this.props.ContactLastName,
            ContactAddress: (this.props.ContactAddress ? this.props.ContactAddress : ""),
            ContactEmail: (this.props.ContactEmail ? this.props.ContactEmail : ""),
            ContactDefaultNumber: this.props.ContactDefaultNumber,
            ContactDefaultNumberType: (this.props.ContactDefaultNumberType ? this.props.ContactDefaultNumberType : ""),
        });
    },
    handleCloseClick: function (e) {
        e.preventDefault();
        this.handleResetClick();
        this.props.onClose();
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
        this.props.onClose();
    },
    render: function () {
        if (this.props.isOpen === false) return null;

        return (
            <div>
                <div className="contactModal">
                    <p className="contactTitle">Edit Form</p>
                    <br />
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
                        <br />
                        <input type="button" value="Reset" className="btn btn-default buttonWidth33" onClick={this.handleResetClick} />
                        <input type="button" value="Cancel" className="btn btn-default buttonWidth33" onClick={this.handleCloseClick} />
                        <input type="submit" value="Submit" className="btn btn-primary buttonWidth33" />
                    </form>
                </div>
                <div className="contactModalBackdrop" onClick={this.handleCloseClick} />
            </div>
        )
    }
});

var ContactTable = React.createClass({
    loadContactFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getContactUrl + this.props.currentContactId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ contact: data });
        }.bind(this);
        xhr.send();
    },
    loadPhoneNumbersFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getPhoneNumbersUrl + this.props.currentContactId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ phoneNumbers: data });
        }.bind(this);
        xhr.send();
    },
    getInitialState: function () {
        return { contact: {}, phoneNumbers: [], isContactModalOpen: false };
    },
    componentDidMount: function () {
        this.loadContactFromServer();
        this.loadPhoneNumbersFromServer();
        window.setInterval(this.loadContactFromServer, this.props.pollInterval);
        window.setInterval(this.loadPhoneNumbersFromServer, this.props.pollInterval);
    },
    openContactModal: function () {
        this.setState({ isContactModalOpen: true })
    },
    closeContactModal: function () {
        this.setState({ isContactModalOpen: false })
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
        xhr.open('post', this.props.contactEditUrl + contact.ContactID, true);
        xhr.onload = function () {
            this.loadContactFromServer();
        }.bind(this);
        xhr.send(data);
    },
    handlePhoneNumberCreate: function (phoneNumber) {
        var data = new FormData();
        data.append('PhoneNumberNumber', phoneNumber.PhoneNumberNumber);
        data.append('PhoneNumberType', phoneNumber.PhoneNumberType);
        data.append('ContactID', this.state.contact.ContactID);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.phoneNumberCreateUrl, true);
        xhr.onload = function () {
            this.loadPhoneNumbersFromServer();
        }.bind(this);
        xhr.send(data);
    },
    handlePhoneNumberSetAsDefault: function (phoneNumber) {
        var contact = {
            ContactID: this.state.contact.ContactID,
            ContactFirstName: (this.state.contact.ContactFirstName ? this.state.contact.ContactFirstName : ""),
            ContactLastName: this.state.contact.ContactLastName,
            ContactAddress: (this.state.contact.ContactAddress ? this.state.contact.ContactAddress : ""),
            ContactEmail: (this.state.contact.ContactEmail ? this.state.contact.ContactEmail : ""),
            ContactDefaultNumber: phoneNumber.PhoneNumberNumber,
            ContactDefaultNumberType: (phoneNumber.PhoneNumberType ? phoneNumber.PhoneNumberType : ""),
        };
        phoneNumber.PhoneNumberNumber = this.state.contact.ContactDefaultNumber;
        phoneNumber.PhoneNumberType = (this.state.contact.ContactDefaultNumberType ? this.state.contact.ContactDefaultNumberType : "");

        this.handleContactEdit(contact);
        this.handlePhoneNumberEdit(phoneNumber);
    },
    handlePhoneNumberEdit: function (phoneNumber) {
        var data = new FormData();
        data.append('PhoneNumberID', phoneNumber.PhoneNumberID);
        data.append('PhoneNumberNumber', phoneNumber.PhoneNumberNumber);
        data.append('PhoneNumberType', phoneNumber.PhoneNumberType);
        data.append('ContactID', phoneNumber.ContactID);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.phoneNumberEditUrl + phoneNumber.PhoneNumberID, true);
        xhr.onload = function () {
            this.loadPhoneNumbersFromServer();
        }.bind(this);
        xhr.send(data);
    },
    handlePhoneNumberDelete: function (phoneNumber) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.phoneNumberDeleteUrl + phoneNumber.PhoneNumberID, true);
        xhr.onload = function () {
            this.loadPhoneNumbersFromServer();
        }.bind(this);
        xhr.send();
    },
    render: function () {
        var iconLink;
        switch (this.state.contact.ContactDefaultNumberType) {
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
        var onPhoneNumberSetAsDefault = this.handlePhoneNumberSetAsDefault;
        var onPhoneNumberEdit = this.handlePhoneNumberEdit;
        var onPhoneNumberDelete = this.handlePhoneNumberDelete;
        var phoneNumberNodes = this.state.phoneNumbers.map(function (phoneNumber) {
            return (
                <PhoneNumber onPhoneNumberSetAsDefault={onPhoneNumberSetAsDefault}
                    onPhoneNumberEdit={onPhoneNumberEdit}
                    onPhoneNumberDelete={onPhoneNumberDelete}
                    key={phoneNumber.PhoneNumberID}
                    PhoneNumberID={phoneNumber.PhoneNumberID}
                    PhoneNumberNumber={phoneNumber.PhoneNumberNumber}
                    PhoneNumberType={phoneNumber.PhoneNumberType}
                    ContactID={phoneNumber.ContactID} />
            );
        });
        return (
            <div className="panelCustom">
                <a href="/"><button type="button" className="btn btn-default btn-sm"><span className="glyphicon glyphicon-menu-left"></span> Back</button></a>
                <ContactModal isOpen={this.state.isContactModalOpen}
                    onClose={this.closeContactModal}
                    onContactEdit={this.handleContactEdit}
                    ContactID={this.state.contact.ContactID}
                    ContactFirstName={this.state.contact.ContactFirstName}
                    ContactLastName={this.state.contact.ContactLastName}
                    ContactAddress={this.state.contact.ContactAddress}
                    ContactEmail={this.state.contact.ContactEmail}
                    ContactDefaultNumber={this.state.contact.ContactDefaultNumber}
                    ContactDefaultNumberType={this.state.contact.ContactDefaultNumberType} />
                <div className="panel panel-default">
                    <p className="contactTitle">Contact</p>
                    <table className="table table-hover">
                        <tbody>
                            <tr className="contactRow">
                                <td className="contactTd">
                                    <p><img src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-20.png" /> {this.state.contact.ContactFirstName} {this.state.contact.ContactLastName}</p>
                                    <p><img src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/location-20.png" /> {this.state.contact.ContactAddress}</p>
                                    <p><img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/internet-mail-20.png" /> {this.state.contact.ContactEmail}</p>
                                    <p><img src={iconLink} /> {this.state.contact.ContactDefaultNumber}</p>
                                    <button className="btn btn-success btn-sm contactButtonEdit" onClick={this.openContactModal}><span className="glyphicon glyphicon-edit"></span> Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="panel panel-default">
                    <p className="phoneNumbersTitle">Other numbers</p>
                    <table className="table table-hover">
                        <tbody>
                            {phoneNumberNodes}
                        </tbody>
                    </table>
                    <PhoneNumberForm onPhoneNumberCreate={this.handlePhoneNumberCreate} />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <ContactTable currentContactId={window.location.href.match(/([^\/]*)\/*$/)[1]}
        contactsSearchUrl="/Contacts/Search"
        getContactUrl="/Contacts/GetContact/"
        contactEditUrl="/Contacts/Edit/"
        getPhoneNumbersUrl="/Contacts/GetPhoneNumbersForContact/"
        phoneNumberCreateUrl="/PhoneNumbers/Create"
        phoneNumberEditUrl="/PhoneNumbers/Edit/"
        phoneNumberDeleteUrl="/PhoneNumbers/Delete/"
        pollInterval={2000} />,
    document.getElementById('content')
);
