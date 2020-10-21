import React from "react";
import { Redirect } from "react-router-dom";

class PostStatus extends React.Component {
    //statusInputRef= React.createRef(); реф реакта, не работает с зафексированым валью
    state = {
        editMode:false,
        status:this.props.status
    }
    activEditMode =()=>{
        this.setState({//перерисовка реакт компанентой
            editMode:true
        })
        //this.state.editMode = true;
        //this.forceUpdate();//принудительная перерисовка
    }
    deactivEditMode =()=>{
        this.setState({
            editMode:false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange =(e)=>{
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.status!==this.props.status){
            this.setState({
                status:this.props.status
            })
        }
    }
    
    render(){
        return(  
            <div>
                {!this.state.editMode &&
                <div>
                    <span 
                    onDoubleClick ={this.activEditMode}// двойное нажатие на активацию
                     >{this.props.status || "No status"}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input 
                    //ref={this.statusInputRef} 
                    onChange={this.onStatusChange}//вызов функции посимфольной перерисовки
                    autoFocus={true} //автофокус
                    onBlur={this.deactivEditMode} //убрали фокус
                    value={this.state.status}//принудительное значение
                    />
                </div>}
            </div>  
        )
    }
}

export default PostStatus;