import React from 'react';
import './styles/Other.css'
import {EditableTypography} from "./EditableTypography";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/AuthContext";
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

const ProfilePage = ( props ) => {

    const handleGroupNameValidation = (newName) => {
        return /^[A-Za-z][A-Za-z0-9\s_\-]+$/.test(newName)
    }
    // TODO: convert to conference somehow...
    const handleGroupNameChange = (key, new_val) => {
      if (key === "fullname") {
        let values = new_val.trim().split(/\s+/);
        ((props.user || {}).user || {}).name = values[0]
        (props.user || {}).last_name = values[1]
      }
    }

    let {authTokens} = useContext(authContext)
    let token = String("Bearer " + String(authTokens.access))
    let navigate = useNavigate()

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={"http://localhost:8000" + (((props.user || {}).user || {}).profile || {}).image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '200px' }}
                  fluid />
                <div className="d-flex justify-content-center mb-2 profile-buttons">
                    <button type="button" className="btn btn-danger">Delete profile</button>
                    <div className="divider"/>
                    <button type="button" className="btn btn-info" onClick={() => {
                        props.userCRUDHandler("update", props.user, token)
                        navigate('/')
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
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
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
                      {/*{user_info.user_info.lastname} {user_info.user_info.name}*/}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{((props.user || {}).user || {}).email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Login</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{((props.user || {}).user || {}).username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Balance</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{((props.user || {}).user || {}).balance}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{((props.user || {}).user || {}).city}, {((props.user || {}).user || {}).country}</MDBCardText>
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
                  <MDBCardText className="mb-4">My conferences</MDBCardText>
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
                  <MDBCardText className="mb-4">My lectures</MDBCardText>
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
  );
}

export default ProfilePage