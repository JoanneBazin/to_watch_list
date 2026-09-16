*** Settings ***
Resource    ../../resources/common/auth.resource
Resource    ../../resources/common/browser_setup.resource
Resource    ../../resources/common/dashboard.resource
Resource    ../../resources/pages/login_page.resource
Resource   ../../variables/common.robot

Suite Setup         Setup Login Suite
Suite Teardown      Teardown Login Suite
Test Setup          Open New Context And Page   ${BASE_URL}/auth
Test Teardown       Close Current Context

*** Test Cases ***
Login User Successfully
    [Tags]      regression
    Fill Login Form    ${WORKER_USER}[email]    ${WORKER_USER}[password]
    Submit Auth Form
    Dashboard Is Displayed  ${WORKER_USER}[name]

Login With Unknown Email
    [Tags]      regression
    Fill Login Form    random_email@test.com    ${WORKER_USER}[password]
    Submit Auth Form
    Auth Error Message Is Displayed

Login With Wrong Password
    [Tags]      regression
    Fill Login Form    ${WORKER_USER}[email]    wrongPassword1234
    Submit Auth Form
    Auth Error Message Is Displayed

Login With Missing Email
    Fill Login Form    ${EMPTY}    ${WORKER_USER}[password]
    Submit Auth Form
    Validation Error Message Is Displayed   email

Login With Missing Password
    Fill Login Form    ${WORKER_USER}[email]    ${EMPTY}
    Submit Auth Form
    Validation Error Message Is Displayed   password

*** Keywords ***
Setup Login Suite
    Open Browser Instance
    Create Worker User

Teardown Login Suite
    Clean Worker User
    Close Browser Instance