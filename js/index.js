(function (window) {
    emailjs.init("CE3xB7H17Ps8k2AJq");
    var data = {
        nameText: "",
        nameValid: false,
        telText: "",
        telValid: true,
        emailText: "",
        emailValid: false,
        message: "",
        messageValid: false,
    }
    var vm = new Vue({
        el: "#main",
        data: data,
        computed: {
            canSend: function () {
                if (this.nameValid == false || this.emailValid == false || this.messageValid == false) {
                    return false
                } else {
                    return true
                }
            }
        },
        mounted: function () {

        },
        created: function () {

        },
        methods: {
            submitEmail: function () {
                if (this.nameValid == false || this.emailValid == false || this.messageValid == false) return
                var template_params = {
                    "user_email": this.emailText,
                    "user_name": this.nameText,
                    "user_tel": this.telText,
                    "message": this.message,
                }
                var service_id = "service_u3q53vi";
                var template_id = "template_c0cr3to";
                var user_id = 'CE3xB7H17Ps8k2AJq';
                var self = this;
                emailjs.send(service_id, template_id, template_params, user_id)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                        alert('已收到您的來信，將盡快與您聯繫');
                        self.nameText = "";
                        self.telText = "";
                        self.emailText = "";
                        self.message = "";
                        var feedbackModal = document.getElementById('feedbackModal');
                        var modal = bootstrap.Modal.getInstance(feedbackModal)
                        modal.hide();
                    }, function (error) {
                        console.log('FAILED...', error);
                    });
            }
        },
        watch: {
            nameText: function () {
                if (this.nameText != "") {
                    this.nameValid = true;
                } else {
                    this.nameValid = false;
                }

            },
            telText: function () {

            },
            emailText: function () {
                var isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                if (!isMail.test(this.emailText)) {
                    this.emailValid = false;
                }
                else {
                    this.emailValid = true;
                }
            },
            message: function () {
                if (this.message != "") {
                    this.messageValid = true;
                } else {
                    this.messageValid = false;
                }
            },
        }
    })

})(window);