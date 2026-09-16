*** Settings ***
Resource    ../../resources/common/auth.resource
Resource    ../../resources/common/dashboard.resource
Resource    ../../resources/data/db_setup.resource
Resource    ../../resources/pages/login_page.resource

Suite Setup         Create Worker User
Suite Teardown      Clean Worker User
Test Setup          New Context
Test Teardown       Close Context

*** Test Cases ***
Login User Successfully
    [Tags]      regression
    Go to Login Page
    Fill Login Form    ${WORKER_USER}[email]    ${WORKER_USER}[password]
    Submit Auth Form
    Dashboard Is Displayed  ${WORKER_USER}[name]

Login With Unknown Email
    [Tags]      regression
    Go to Login Page
    Fill Login Form    random_email@test.com    ${WORKER_USER}[password]
    Submit Auth Form
    Auth Error Message Is Displayed

Login With Wrong Password
    [Tags]      regression
    Go to Login Page
    Fill Login Form    ${WORKER_USER}[email]    wrongPassword1234
    Submit Auth Form
    Auth Error Message Is Displayed

Login With Missing Email
    Go to Login Page
    Fill Login Form    ${EMPTY}    ${WORKER_USER}[password]
    Submit Auth Form
    Validation Error Message Is Displayed   email

Login With Missing Password
    Go to Login Page
    Fill Login Form    ${WORKER_USER}[email]    ${EMPTY}
    Submit Auth Form
    Validation Error Message Is Displayed   password
