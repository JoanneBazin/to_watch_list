*** Settings ***
Resource    ../../resources/common/auth.resource
Resource    ../../resources/common/browser_setup.resource
Resource    ../../resources/common/dashboard.resource
Resource   ../../variables/common.robot

Suite Setup         Setup Authenticated Session
Suite Teardown      Teardown Authenticated Session
Test Setup          Open New Page   ${BASE_URL}/dashboard
Test Teardown       Close Current Page

*** Variables ***
${SIGNOUT_BTN}      [data-testid="signout-btn"] >> visible=true

*** Test Cases ***
Logout User Successfully
    [Tags]      regression
    Open Header Menu
    Click   ${SIGNOUT_BTN}
    Auth Page Is Displayed
    Go To   ${BASE_URL}/dashboard
    Auth Page Is Displayed

*** Keywords ***
Setup Authenticated Session
    Open Browser Instance
    New Context
    Create Worker User
    Log In As Worker User

Teardown Authenticated Session
    Clean Worker User
    Close Browser Instance