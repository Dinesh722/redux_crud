import React , {Component} from 'react';
import './App.css';
import { connect } from 'react-redux';
import Prototypes from 'prop-types';
import { getEmployee, addEmployee, deleteEmployee, editEmployee } from './Redux/action';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {  
      id: 0,  
      employeeName: "",  
      employeeDepartment: ""  
    }; 
  }

  static protoTypes = {
    employees : Prototypes.array.isRequired,
    getEmployee : Prototypes.func.isRequired,
    addEmployee : Prototypes.func.isRequired,
    deleteEmployee : Prototypes.func.isRequired,
    editEmployee : Prototypes.func.isRequired
  }

  componentDidMount() {  
    this.props.getEmployee();  
    localStorage.setItem("id",this.props.employees.length)
  }

  submitData(){
    console.log(this.state)
    if (this.state.employeeName && this.state.employeeDepartment && !this.state.id) {  
      const newEmployee = {  
        // id: Math.floor(Math.random() * (999 - 100 + 1) + 100),  
        id: localStorage.getItem("id")*1 + 1*1,  
        employeeName: this.state.employeeName,  
        employeeDepartment: this.state.employeeDepartment,  
      };  
      this.props.addEmployee(newEmployee);  
    }else if (this.state.employeeName && this.state.employeeDepartment && this.state.id) {  
      const updatedDetails = {  
        id: this.state.id,  
        employeeName: this.state.employeeName,  
        employeeDepartment: this.state.employeeDepartment,  
      };  
      this.props.editEmployee(updatedDetails);  
    }else {  
      alert('Enter Employee Details.');  
    } 
  }

  deleteEmployee(id){
    this.props.deleteEmployee(id)
  }

  editDetails(data){  
    this.setState({  
      id: data.id,  
      employeeName: data.employeeName,  
      employeeDepartment: data.employeeDepartment  
    })  
  } 

  render(){
    return (
      <div> 
        <br></br>

         <div className="col-md-12 row text-center">  

         <div className="col-md-4">
         <input onChange={(e)=>{
              this.setState({
                employeeName:e.target.value
              })
            }} value={this.state.employeeName} type="text" placeholder="Employee Name" />
         </div> 

         <div className="col-md-4">
           <input onChange={(e)=>{
             this.setState({
              employeeDepartment:e.target.value
             })
           }} value={this.state.employeeDepartment} type="text" placeholder="Employee Department" />
         </div>

         {this.state.id ? <button onClick={this.submitData.bind(this)}>UPDATE</button> : <button onClick={this.submitData.bind(this)}>ADD</button>}
          </div> 

           <br></br>
            <div>  
              <table className="table table-bordered text-center" >  
                <thead>  
                  <tr>  
                    <th>ID</th>  
                    <th>Name</th>  
                    <th>Depatment Name</th>  
                    <th colSpan="2">Action</th>  
                  </tr>  
                </thead>  
                {this.props.employees.map((data, index) => { 
                return <tbody key={(index + 1)}>  
                     <tr>  
                      <td>{(index + 1)}</td>  
                      <td>{data.employeeName}</td>  
                      <td>{data.employeeDepartment}</td>  
                      <td><button onClick={this.editDetails.bind(this,data)}>EDIT</button> </td>  
                      <td><button onClick={this.deleteEmployee.bind(this,data.id)}>DELETE</button></td>
                    </tr>  
                </tbody>  
                 })}  
              </table>  
            </div>  
      </div>
    );
  }
}
const mapStateToProps =  state => ({
  employees : state.employees
})
export default connect(mapStateToProps,{ getEmployee, addEmployee, deleteEmployee, editEmployee })(App);
