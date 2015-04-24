var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var infoSchema = new mongoose.Schema({
    Cust_type_desc : String,
    Employee_number : String,
    Employee_name : String,
    Employee_Type : String,
    Internal_PU : String,
    Emp_prod_unit : String,
    Job_function : String,
    Job_qualif : String,
    Exp_type : String,
    PA_date : Number,
    Exp_Group_Code : String,
    Billable_Flag : String,
    Project_number : String,
    Project_name :  String,
    Project_type : String,
    Project_prod_unit : String,
    Customer_number : Number,
    Customer_name : String
});

var collabSchema = new mongoose.Schema({
 
    Utilization : Number,
    ARVI : Number,
    Collab_number : String,
    Name : String,
    Qualif : String,
    Type : String,
    Total_Worked_Time : Number,
    PS_Billable : Number,
    PS_Unpaid : Number,
    Not_Paid_Hol : Number,
    Paid_Hol : Number,
    Statutory_Recovery : Number,
    Sickness : Number,
    Bench : Number,
    Internal_Work : Number,
    Business_Development : Number,
    ARVE : Number
});


var userSchema = new mongoose.Schema({
	username: String,
    email: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});


mongoose.model('Info', infoSchema);
mongoose.model('User', userSchema);
mongoose.model('Collab', collabSchema);

