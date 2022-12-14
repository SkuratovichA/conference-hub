// author: Shchapaniak Andrei

import React from 'react';
import './styles/Other.css'
import {EditableTypography} from "./EditableTypography";
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
import {userCRUDHandler} from "../actions/UserFunctions";

const ProfilePageResearcher = ( props ) => {

    const handleGroupNameValidation = (newName) => {
        return true
    }

    const handleGroupNameChange = (key, new_val) => {
        if (key === "fullname") {
            let new_values = new_val.trim().split(/\s+/);
            if (new_values.length === 2) {
                Object.assign(props.user, setProperty(props.user, 'user.name', new_values[1]))
                Object.assign(props.user, setProperty(props.user, 'last_name', new_values[0]))
            }
        }
        else if (key === "address") {
            let new_values = new_val.trim().split(/\s+/);
            if (new_values.length === 2) {
                Object.assign(props.user, setProperty(props.user, 'user.country', new_values[1]))
                Object.assign(props.user, setProperty(props.user, 'user.city', new_values[0].slice(0, -1)))
            }
        }
        else if (key === "email") {
            Object.assign(props.user, setProperty(props.user, 'user.email', new_val))
        }
        else if (key === "login") {
            Object.assign(props.user, setProperty(props.user, 'user.username', new_val))
        }
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCardBody className="text-center">
                            <MDBCardImage
                              src={"http://localhost:8000/media/static/default.png"}
                              alt="avatar"
                              className="rounded-circle"
                              style={{ width: '250px' }}
                              fluid
                            />
                            <div className="d-flex justify-content-center mb-2 profile-buttons">
                                <button type="button" className="btn btn-danger">
                                    Delete profile
                                </button>
                                <div className="divider"/>
                                <button type="button" className="btn btn-info"
                                    onClick={() => {
                                        userCRUDHandler("update", props.user, props.token)
                                    }
                                }
                                >
                                    Save Changes
                                </button>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3" className="card-text-center">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            <EditableTypography
                                                canEdit={true}
                                                variant="h1"
                                                initialValue={(props.user || {}).last_name + " " + ((props.user || {}).user || {}).name}
                                                onValidate={handleGroupNameValidation}
                                                onSave={(v) => handleGroupNameChange("fullname", v)}
                                                label="FullName"

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
                        initialValue={((props.user || {}).user || {}).email}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("email", v)}
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
                        initialValue={((props.user || {}).user || {}).username}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("login", v)}
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
                        initialValue={((props.user || {}).user || {}).balance + " $"}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("balance", v)}
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
                        initialValue={((props.user || {}).user || {}).city + ", " + ((props.user || {}).user || {}).country}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("address", v)}
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
            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">My conferences</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>My conferences</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">My lectures</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>My lectures</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">My Organizations</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>My organizations</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default ProfilePageResearcher