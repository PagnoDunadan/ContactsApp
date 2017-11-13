var ContactsTable = React.createClass({
    loadContactFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getContactUrl + this.state.currentContactId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ contact: data });
            console.log("contactUrlResponse: " + JSON.stringify(this.state.contact));
        }.bind(this);
        xhr.send();
    },
    loadPhoneNumbersFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.getPhoneNumbersUrl + this.state.currentContactId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ phoneNumbers: data });
            console.log("phoneNumbersUrlResponse: " + JSON.stringify(this.state.phoneNumbers));
        }.bind(this);
        xhr.send();
    },
    getInitialState: function () {
        return { currentContactId: (window.location.href.match(/([^\/]*)\/*$/)[1]), contact: {}, phoneNumbers: [] };
    },
    componentDidMount: function () {
        console.log("contactInitial: " + JSON.stringify(this.state.contact));
        console.log("phoneNumbersInitial: " + JSON.stringify(this.state.phoneNumbers));
        this.loadContactFromServer();
        this.loadPhoneNumbersFromServer();
        //window.setInterval(this.loadContactFromServer, this.props.pollInterval);
        //window.setInterval(this.loadPhoneNumbersFromServer, this.props.pollInterval);
    },
    render: function () {
        console.log(this.state.currentContactId);
        return (
            <div>
                <h1>kontakt</h1>
                <h1>brojevi</h1>
            </div>
        );
    }
});

ReactDOM.render(
    // TODO: Fix url names
    <ContactsTable getContactUrl="/Contacts/GetContact/" getPhoneNumbersUrl="/Contacts/GetPhoneNumbersForContact/" pollInterval={2000} />,
    document.getElementById('content')
);
