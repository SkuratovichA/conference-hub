import React from 'react';
import './styles/Other.css'
import {EditableTypography} from "./EditableTypography";
import { useContext } from "react";
import authContext from "../context/AuthContext";
import {setProperty} from "../actions/OtherFunctions"
/* eslint-disable no-useless-escape */
/* eslint-disable no-unexpected-multiline */
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';


export default class ProfilePageOrganization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token
        }

        console.log(this.state)
        this.handleDataChange = this._handleDataChange.bind(this)
        this.handleDataValidation = this._handleDataValidation.bind(this)
    }

    _handleDataValidation = (newName) => {
        return true
    }

    _handleDataChange = (key, new_val) => {
        if (key === "name") {
            Object.assign(this.props.user, setProperty(this.props.user, 'user.name', new_val))
        }
        else if (key === "address") {
            let new_values = new_val.trim().split(/\s+/);
            if (new_values.length === 2) {
                Object.assign(this.props.user, setProperty(this.props.user, 'user.country', new_values[1]))
                Object.assign(this.props.user, setProperty(this.props.user, 'user.city', new_values[0].slice(0, -1)))
            }
        }
        else if (key === "email") {
            Object.assign(this.props.user, setProperty(this.props.user, 'user.email', new_val))
        }
        else if (key === "login") {
            Object.assign(this.props.user, setProperty(this.props.user, 'user.username', new_val))
        }
    }

    render() {

        if (((this.props.user || {}).user || {}).username === undefined) {
            return ""
        }

        return (
        <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={"http://localhost:8000" + (((this.props.user || {}).user || {}).profile || {}).image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '250px' }}
                  fluid />
                <div className="d-flex justify-content-center mb-2 profile-buttons">
                    <button type="button" className="btn btn-danger" onClick={() => {
                        console.log("Delete profile")
                    }
                    }>Delete profile</button>
                    <div className="divider"/>
                    <button type="button" className="btn btn-info" onClick={() => {
                        this.props.userCRUDHandler("update", this.props.user, this.state.token)
                    }
                    }>Save Changes</button>
                </div>
              </MDBCardBody>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((this.props.user || {}).user || {}).name}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("name", v)}
                        label="Name"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((this.props.user || {}).user || {}).email + ""}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("email", v)}
                        label="Email"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Login</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((this.props.user || {}).user || {}).username + ""}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("login", v)}
                        label="Login"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Balance</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={false}
                        variant="h1"
                        initialValue={((this.props.user || {}).user || {}).balance + " $"}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("balance", v)}
                        label="Balance"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((this.props.user || {}).user || {}).city + ", " + ((this.props.user || {}).user || {}).country}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("address", v)}
                        label="Address"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

          <MDBRow>
            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">Conferences</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                  </MDBProgress>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">Members</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                  </MDBProgress>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
      </MDBContainer>
    </section>
        )
    }
}