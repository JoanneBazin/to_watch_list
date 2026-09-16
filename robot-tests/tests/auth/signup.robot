*** Settings ***
Resource    ../../resources/common/auth.resource
Resource    ../../resources/common/dashboard.resource
Resource    ../../resources/data/db_setup.resource
Resource    ../../resources/pages/signup_page.resource

*** Variables ***
${USER_NAME}         Auth user
${USER_EMAIL}        auth@test.com
${USER_PASSWORD}     password1234

*** Test Cases ***
Signup New User Successfully
    [Tags]      regression
    [Teardown]  Clean User In Db    ${USER_EMAIL}
    Go to Signup Page
    Fill Signup Form    ${USER_NAME}    ${USER_EMAIL}    ${USER_PASSWORD}
    Submit Auth Form
    Dashboard Is Displayed  ${USER_NAME}

Signup With Existing Email
    [Tags]      regression
    ${existing_user}=   Create User In Db
    Go to Signup Page
    Fill Signup Form    ${USER_NAME}    ${existing_user['email']}    ${USER_PASSWORD}
    Submit Auth Form
    Auth Error Message Is Displayed

Signup With Missing Name
    Go to Signup Page
    Fill Signup Form    ${EMPTY}    ${USER_EMAIL}    ${USER_PASSWORD}
    Submit Auth Form
    Validation Error Message Is Displayed   name

Signup With Missing Email
    Go to Signup Page
    Fill Signup Form    ${USER_NAME}    ${EMPTY}    ${USER_PASSWORD}
    Submit Auth Form
    Validation Error Message Is Displayed   email

Signup With Missing Password
    Go to Signup Page
    Fill Signup Form    ${USER_NAME}    ${USER_EMAIL}    ${EMPTY}
    Submit Auth Form
    Validation Error Message Is Displayed   password

Signup With Invalid Email
    Go to Signup Page
    Fill Signup Form    ${USER_NAME}    wrong_email.com    ${USER_PASSWORD}
    Submit Auth Form
    Validation Error Message Is Displayed   email

Signup With Invalid Password
    Go to Signup Page
    Fill Signup Form    ${USER_NAME}    ${USER_EMAIL}    2short1
    Submit Auth Form
    Validation Error Message Is Displayed   password