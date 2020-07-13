//
//  AppUITests.swift
//  AppUITests
//
//  Created by QISM1 on 6/18/20.
//

import XCTest

class AppUITests: XCTestCase {
    
    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        
        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }
    
    override class func setUp() {
    }
    func testLogin() throws {
        let institution = "ATU", username = "cw99@test.cbord.com", password = "P@ssword2"
        let app = XCUIApplication()
        app.launch()
        app.webViews.webViews.textViews.buttons["SEARCH ALL INSTITUTIONS"].press(forDuration: 0.8)
        app.webViews.webViews.textViews.buttons["SEARCH ALL INSTITUTIONS"].tap()
        app.webViews.webViews.textViews/*@START_MENU_TOKEN@*/.textFields["Search..."]/*[[".otherElements[\"GET CBORD Student\"]",".otherElements[\"banner\"]",".otherElements[\"search\"].textFields[\"Search...\"]",".otherElements[\"Search...\"].textFields[\"Search...\"]",".textFields[\"Search...\"]"],[[[-1,4],[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,4],[-1,3],[-1,2],[-1,1,2]],[[-1,4],[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.tap()
        app.webViews.webViews.textViews.buttons["\(institution) arrow forward"].tap()
        
        let login = app/*@START_MENU_TOKEN@*/.otherElements["main"]/*[[".otherElements[\"GET CBORD Student\"].otherElements[\"main\"]",".otherElements[\"main\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/
        login.children(matching: .other).element(boundBy: 2).children(matching: .textField).element.tap()
        login.children(matching: .other).element(boundBy: 2).children(matching: .textField).element.typeText(username)
        login.children(matching: .other).element(boundBy: 4).children(matching: .secureTextField).element.tap()
        login.children(matching: .other).element(boundBy: 4).children(matching: .secureTextField).element.typeText(password)
        app.webViews.webViews.textViews/*@START_MENU_TOKEN@*/.buttons["LOG IN"]/*[[".otherElements[\"GET CBORD Student\"]",".otherElements[\"main\"].buttons[\"LOG IN\"]",".buttons[\"LOG IN\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
        app.webViews.webViews.textViews/*@START_MENU_TOKEN@*/.buttons["LOG IN"]/*[[".otherElements[\"GET CBORD Student\"]",".otherElements[\"main\"].buttons[\"LOG IN\"]",".buttons[\"LOG IN\"]"],[[[-1,2],[-1,1],[-1,0,1]],[[-1,2],[-1,1]]],[0]]@END_MENU_TOKEN@*/.tap()
    }
}
