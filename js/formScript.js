var validator = new Dominar(document.querySelector('.dominar-form-contact'), {
    user_name: {
      rules: 'required|min:3',
      triggers: ['focusout', 'change', 'keyup'],
      customMessages: {
        required: 'Please Enter Your Name',
        min: 'Please Enter Minimum of :min characters',
      }
    },
    user_email: {
        rules: 'required|email',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Enter Email',
          email: 'Please Enter Valid Email',
        }
    },
    user_phone: {
        rules: 'required|digits:10',
        triggers: ['focusout', 'change', 'keyup'],
        customMessages: {
          required: 'Please Enter Your Mobile Number',
          digits: 'Enter Valid Mobile Number'

        }
    },
    user_message: {
      rules: 'required|min:10',
      triggers: ['focusout', 'change', 'keyup'],
      customMessages: {
        required: 'Please Enter Your Message',
        min: 'Please Enter Minimum of :min characters',
      }
    }
});

function validateCustomerForm(){
    validator.validateAll(sendData)
}
function idval(id){
    return document.getElementById(id) && document.getElementById(id).value;
}
function sendData(){
    let dateStr = new Date().toString();
    let data = objectToFormData(
        {
            name: idval('user_name'), 
            phone:idval('user_phone'), 
            email: idval('user_email'), 
            message: idval('user_message'),
            time: dateStr
        }
    );
    document.getElementById('spin-off').style.display = 'none';
    document.getElementById('spin-on').style.display = 'inline-block';
   
    fetch('https://script.google.com/macros/s/AKfycbyHdxtJnwHWxV6Sk0ZdJupPD8-_HH7SORYdCIy9JPTVFZiDTAq08_zokuvzCRcit7RA/exec', {
        method: "POST",
        body: data
    })
    // The fetch() method is used to make a request to the server and retrieve data.
    // This is an example API endpoint. Replace it with the actual URL for the API endpoint you want to use.
    .then(res => res.text())
    // The .then() method is used to handle the response from the server.
    // The response is converted to text using the res.text() method.
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch(()=>{
        document.getElementById('spin-off').style.display = 'block';
        document.getElementById('spin-on').style.display = 'none';
    })
    ;
};

function objectToFormData(obj) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
}