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
    handleSetAsDefault: function() {
        var PhoneNumberID = this.props.PhoneNumberID;
        var PhoneNumberNumber = this.props.PhoneNumberNumber;
        var PhoneNumberType = this.props.PhoneNumberType;
        var ContactID = this.props.ContactID;
        this.props.onPhoneNumberSetAsDefault({
            PhoneNumberID, PhoneNumberNumber,
            PhoneNumberType, ContactID,
        });
    },
    handleShowEditForm: function () {
        this.setState({ showEditForm: !this.state.showEditForm });
    },
    handlePhoneNumberNumberChange: function (e) {
        this.setState({ PhoneNumberNumber: e.target.value });
    },
    handlePhoneNumberTypeChange: function (e) {
        this.setState({ PhoneNumberType: e.target.value });
    },
    handleResetClick: function (e) {
        this.setState({
            PhoneNumberNumber: this.props.PhoneNumberNumber,
            PhoneNumberType: (this.props.PhoneNumberType ? this.props.PhoneNumberType : "Mobile"),
        });
    },
    handleEdit: function (e) {
        e.preventDefault();
        var PhoneNumberID = this.props.PhoneNumberID;
        var PhoneNumberNumber = this.state.PhoneNumberNumber.trim();
        var PhoneNumberType = this.state.PhoneNumberType.trim();
        var ContactID = this.props.ContactID;
        // TODO: Input validation
        if (!PhoneNumberNumber) {
            alert("PhoneNumberNumber cannot be null");
            return;
        }
        this.props.onPhoneNumberEdit({
            PhoneNumberID, PhoneNumberNumber,
            PhoneNumberType, ContactID,
        });
    },
    handleDelete: function (e) {
        var PhoneNumberID = this.props.PhoneNumberID;
        this.props.onPhoneNumberDelete({ PhoneNumberID });
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
                        <input type="button" value="Reset" className="btn btn-default" onClick={this.handleResetClick} />
                        <input type="submit" value="Submit" className="btn btn-primary" />
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
    handleShowPhoneNumberFormClick: function () {
        this.setState({ showPhoneNumberForm: !this.state.showPhoneNumberForm });
    },
    handlePhoneNumberNumberChange: function (e) {
        this.setState({ PhoneNumberNumber: e.target.value });
    },
    handlePhoneNumberTypeChange: function (e) {
        this.setState({ PhoneNumberType: e.target.value });
    },
    handleResetClick: function (e) {
        this.setState({
            PhoneNumberNumber: '', PhoneNumberType: 'Mobile',
        });
    },
    handleCancelClick: function (e) {
        this.setState({
            showPhoneNumberForm: false,
            PhoneNumberNumber: '', PhoneNumberType: 'Mobile',
        });
    },
    handleCreate: function (e) {
        e.preventDefault();
        var PhoneNumberNumber = this.state.PhoneNumberNumber.trim();
        var PhoneNumberType = this.state.PhoneNumberType;
        // TODO: Input validation
        if (!PhoneNumberNumber) {
            alert("PhoneNumberNumber cannot be null");
            return;
        }
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
                <button className="btn btn-success" onClick={this.handleShowPhoneNumberFormClick}> Add a new number </button>
                <form className={this.state.showPhoneNumberForm ? '' : 'displayNone'} onSubmit={this.handleCreate}>
                    <input type="text" placeholder="PhoneNumberNumber *" className="form-control"
                        value={this.state.PhoneNumberNumber} onChange={this.handlePhoneNumberNumberChange} />
                    <select className="form-control" value={this.state.PhoneNumberType} onChange={this.handlePhoneNumberTypeChange}>
                        <option value="Mobile">Mobile</option>
                        <option value="Landline">Landline</option>
                        <option value="Fax">Fax</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="pull-left">
                        <input type="button" value="Reset" className="btn btn-default" onClick={this.handleResetClick} />
                    </div>
                    <div className="pull-right">
                        <input type="button" value="Cancel" className="btn btn-default" onClick={this.handleCancelClick} />
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                    <div className="clearBoth"></div>
                </form>
            </div>
        );
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
        return { contact: {}, phoneNumbers: [] };
    },
    componentDidMount: function () {
        this.loadContactFromServer();
        this.loadPhoneNumbersFromServer();
        window.setInterval(this.loadContactFromServer, this.props.pollInterval);
        window.setInterval(this.loadPhoneNumbersFromServer, this.props.pollInterval);
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
            ContactFirstName: this.state.contact.ContactFirstName,
            ContactLastName: this.state.contact.ContactLastName,
            ContactAddress: this.state.contact.ContactAddress,
            ContactEmail: this.state.contact.ContactEmail,
            ContactDefaultNumber: phoneNumber.PhoneNumberNumber,
            ContactDefaultNumberType: phoneNumber.PhoneNumberType,
        };
        phoneNumber.PhoneNumberNumber = this.state.contact.ContactDefaultNumber;
        phoneNumber.PhoneNumberType = this.state.contact.ContactDefaultNumberType;

        this.handleContactEdit(contact);
        this.handlePhoneNumberEdit(phoneNumber);

        //var contact = new FormData();
        //data.append('ContactID', this.state.contact.ContactID);
        //data.append('ContactFirstName', this.state.contact.ContactFirstName);
        //data.append('ContactLastName', this.state.contact.ContactLastName);
        //data.append('ContactAddress', this.state.contact.ContactAddress);
        //data.append('ContactEmail', this.state.contact.ContactEmail);
        //data.append('ContactDefaultNumber', phoneNumber.PhoneNumberNumber);
        //data.append('ContactDefaultNumberType', phoneNumber.PhoneNumberType);

        //var phoneNumber = new FormData();
        //data.append('PhoneNumberID', phoneNumber.PhoneNumberID);
        //data.append('PhoneNumberNumber', this.state.contact.ContactDefaultNumber);
        //data.append('PhoneNumberType', this.state.contact.ContactDefaultNumberType);
        //data.append('ContactID', phoneNumber.ContactID);

        //var xhr1 = new XMLHttpRequest();
        //// TODO: Namjestit link
        //xhr1.open('post', this.props.submitUrl, true);
        //xhr1.onload = function () {
        //    this.loadContactFromServer();
        //}.bind(this);
        //xhr1.send(contact);

        //var xhr2 = new XMLHttpRequest();
        //// TODO: Namjestit link
        //xhr2.open('post', this.props.submitUrl, true);
        //xhr2.onload = function () {
        //    this.loadPhoneNumbersFromServer();
        //}.bind(this);
        //xhr2.send(phoneNumber);
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
                                    <button className="btn btn-success btn-sm contactButtonEdit" onClick={this.handleShowEditForm}><span className="glyphicon glyphicon-edit"></span> Edit</button>
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
    // TODO: Fix url names
    <ContactTable currentContactId={window.location.href.match(/([^\/]*)\/*$/)[1]}
        getContactUrl="/Contacts/GetContact/"
        contactEditUrl="/Contacts/Edit/"
        getPhoneNumbersUrl="/Contacts/GetPhoneNumbersForContact/"
        phoneNumberCreateUrl="/PhoneNumbers/Create"
        phoneNumberEditUrl="/PhoneNumbers/Edit/"
        phoneNumberDeleteUrl="/PhoneNumbers/Delete/"
        pollInterval={2000} />,
    document.getElementById('content')
);
