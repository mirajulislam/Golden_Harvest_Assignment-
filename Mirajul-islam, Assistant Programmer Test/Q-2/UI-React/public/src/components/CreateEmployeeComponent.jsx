import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            gender: '',
            department: '',
            city: ''
        }
        // this.changeNameHandler = this.changeNameHandler.bind(this);
        // this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    name: employee.name,
                    gender: employee.gender,
                    department : employee.department,
                    city : employee.city
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {name: this.state.name, gender: this.state.gender, department: this.state.department,city: this.state.city};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }

    changeDepartmentHandler= (event) => {
        this.setState({department: event.target.value});
    }
    changeCityHandler= (event) => {
        this.setState({city: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Create New</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>Name: </label>
                                            <input placeholder=" Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Gender: </label>
                                           <div value={this.state.gender} onChange={this.changeGenderHandler}>
                                                <input type="radio" value="Male" name="gender" /> Male
                                                <input type="radio" value="Female" name="gender" /> Female
                                                <input type="radio" value="Other" name="gender" /> Other
                                            </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> Department: </label>
                                            <div>
                                                <select name="department"  value={this.state.department} onChange={this.changeDepartmentHandler}>
                                                    <option name="department" value="select">Select Department</option>
                                                    <option name="department"  value="IT">IT</option>
                                                    <option name="department" value="BUSINESS">BUSINESS</option>
                                                </select>                                               
                                            </div>
                                        </div>
                                        <div className = "form-group">
                                            <label> City: </label>
                                            <div>
                                                <select name="city"  value={this.state.city} onChange={this.changeCityHandler}>
                                                        <option name="city" value="select">Select City</option>
                                                        <option name="city"  value="Dhaka">Dhaka</option>
                                                        <option name="city" value="Khulna">Khulna</option>
                                                    </select>  
                                            </div>    
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent