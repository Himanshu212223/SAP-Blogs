import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {


    return (
        <div className="indexing">
            <h1 className="headline">Formatter on Table in Fiori UI5.</h1>

            <h3 className="objective">Objective</h3>

            <a className="hyperlink" href="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Projects/tree/main">You can clone the Project from github.</a>

            <p className="paragraph">
                We will create a Table with Formatted Column Data like Fuel Type and Price column on below Table.
            </p>

            <Image src="/resources/formatter/formattedTable.png" width={1000} height={200} alt="Formatter on Table" />

            {/* STEPS to FOLLOW */}

            <h3 className="heading">Steps to follow -</h3>

            <p className="paragraph">
                1. Firstly, goto your <span className="tomato">view.xml</span> file and create the Table. 
            </p>
            
            
            <p className="paragraph">
                While Binding the item for <span className="teal">Fuel Type and Price </span>, use <span className="tomato">ObjectNumber tag</span> like below, and we are specifying the formatter on state value. 
            </p>


            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<!--    Binding Fuel Type Column Data    -->
<ObjectNumber
class="sapUiSmallMarginBottom"
inverted="true"
number="{CarModel>fuel_type}"
state="{path : 'CarModel>fuel_type' , formatter : '.formatter.FuelState'}" 
/>


<!--    Binding Price Column Data   -->
<ObjectNumber
    class="sapUiSmallMarginBottom"
    number="{CarModel>price}"
    state="Success"
    unit="{CarModel>currency}"
/>
                    `
                }
            </SyntaxHighlighter>



            <p className="paragraph">
                So, Our <span className="tomato">view.xml</span> file will somewhat look like this- 
            </p>

            
            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<carTable:View
    controllerName="fiori.practice.controller.CarTable"
    xmlns:carTable="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
>
    <Page id="carTable" title="Car Table" showNavButton="true" navButtonPress="onNavBack">
		
        <content>
    
            <Table id="idProductsTable" items="{CarModel>/}" headerText="Car Table">
		        <headerToolbar>
                    <OverflowToolbar>
				        <content>
					        
                            <Title text="Car Table" level="H2"/>
					            
                            <ToolbarSpacer />
                                
	            			<ToggleButton id="toggleInfoToolbar"
                                text="Hide/Show InfoToolbar"
                                press="onToggleInfoToolbar" />
				        </content>
			        </OverflowToolbar>
                </headerToolbar>
		
                <infoToolbar>
			        <OverflowToolbar>
				        
						<Label text="Other Options - "/>

					    <ToolbarSpacer />

						<SearchField ariaLabelledBy="text1" id="maxPrice" liveChange="onSearch">
								<layoutData><OverflowToolbarLayoutData maxWidth="300px" shrinkable="true" priority="NeverOverflow"/></layoutData>
						</SearchField>

					    <ToolbarSpacer />

						<OverflowToolbarMenuButton tooltip="Sort" type="Transparent" text="Sort" buttonMode="Split" icon="sap-icon://sort" useDefaultActionOnly="true">
							<menu>
								<Menu itemSelected="onMenuAction">
									<MenuItem text="Sort by Price" icon="sap-icon://sort" press="sorting" />
									<MenuItem text="Sort by Rating" icon="sap-icon://sort" press="sorting" />
								</Menu>
							</menu>
						</OverflowToolbarMenuButton>

						<Button text="Reset" type="Transparent" press="onReset"/>

			        </OverflowToolbar>
	        	</infoToolbar>
		
                <columns>
					
					<Column>
						<Text text="Model" />
					</Column>
					<Column>
						<Text text="Rating" />
					</Column>
					<Column>
						<Text text="Mileage" />
					</Column>
					<Column>
						<Text text="Engine" />
					</Column>
					<Column>
						<Text text="Transmission" />
					</Column>
					<Column>
						<Text text="Fuel Type" />
					</Column>
					<Column>
						<Text text="Seating Capacity" />
					</Column>
					<Column>
						<Text text="Price" />
					</Column>
				</columns>

				<items>
					<ColumnListItem vAlign="Middle">
						<cells>

							<ObjectNumber
								class="sapUiSmallMarginBottom"
								number="{CarModel>name}"
							/>
							
							<RatingIndicator maxValue="5" class="sapUiSmallMarginBottom" value="{CarModel>rating}" editable="false" />
							
							<Text text="{CarModel>mileage}" />
							<Text text="{CarModel>engine}" />
							<Text text="{CarModel>transmission}" />
							
							<ObjectNumber
								class="sapUiSmallMarginBottom"
								inverted="true"
								number="{CarModel>fuel_type}"
								state="{path : 'CarModel>fuel_type' , formatter : '.formatter.FuelState'}" />
							
							<Text text="{CarModel>seating_capacity}" />
							
							<ObjectNumber
								class="sapUiSmallMarginBottom"
								number="{CarModel>price}"
								state="Success"
								unit="{CarModel>currency}"
							/>

						</cells>
					</ColumnListItem>
				</items>
			</Table>
        </content>
    </Page>

</carTable:View>
                    `
                }
            </SyntaxHighlighter>



            <p className="paragraph">
                2. Now go to <span className="tomato">Controller.js</span> file and add the <span className="teal">formatter</span> at the top.
            </p>


            <p className="paragraph">
                So, our <span className="tomato">Controller.js</span> file will look like below (remember the methods defined on the Controller are getting used for different purpose like toggle the display of info bar, search , sort and reset functionality. They are not reffering to formatter.)
            </p>

        

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "fiori/practice/controller/Controller",
	'sap/m/MessageToast',
	"fiori/practice/utils/formatter"

] , (Controller, MessageToast, formatter) => {

    return Controller.extend("fiori.practice.controller.CarTable" , {

		formatter : formatter ,

        onInit() {
        
        },


        onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		},

		
		onSearch : function(oEvent){
			/* 
				Filter requires 3 parameters -
				1. Path	(data variables used on our JSON Model)
				2. Operator (operator should be from sap.ui.model.FileOperator Library and operators can be EQ i.e., equals, Contains etc)
				3. searched value (the value we type on search bar)

				and Filter is defined in sap.ui.model Library
			*/

			
			let searchedValue = oEvent.getSource().getValue() ;

			let path1 = "name";
			let path2 = "fuel_type";
			let path3 = "currency"
						
			let operator = sap.ui.model.FilterOperator.Contains ;

			let aFilter = [
				new sap.ui.model.Filter(path1, operator, searchedValue),
				new sap.ui.model.Filter(path2, operator, searchedValue),
				new sap.ui.model.Filter(path3, operator, searchedValue)
			];

			/*	in the below line, if we provide andOperator as True, then whatever we search should be 
                present in all 3 path like if we search "abc" , then it will show result iff abc is present 
                in name, fuel_type and currency as well.
            */

			let andOperator = false ;
			
			let allFilters = new sap.ui.model.Filter(aFilter, andOperator) ;

			this.getView().byId("idProductsTable").getBinding("items").filter(allFilters) ;
		},




		sorting : function(oEvent) {
			/* 
				Sort requires 3 parameters -
				1. Path	(data variables used on our JSON Model)
				2. Descending (if true, it will arrange in Descending order, if false it will arrange in Ascending Order.)
				3. Group By (if you want to group your result in a particular value)

				and Sort is defined in sap.ui.model Library
			*/

			let sortBy = oEvent.getSource().getProperty("text") ;	// read the text of the button
			
			let path = null ;

			if(sortBy === "Sort by Price"){
				path = "price"
			}
			else if(sortBy === "Sort by Rating"){
				path = "rating"
			}

			let decending = false ;
			let group = false;

			let oSorter = new sap.ui.model.Sorter(path, decending, group) ;
			
			this.getView().byId("idProductsTable").getBinding("items").sort(oSorter) ;

			MessageToast.show(sortBy);
		},



		onReset : function(){
			this.getView().byId("idProductsTable").getBinding("items").filter([]) ;
			this.getView().byId("idProductsTable").getBinding("items").sort() ;

			MessageToast.show("Sort and Filter is Reset now.");
		}



    });

});
                    `
                }
            </SyntaxHighlighter>


            <p className="paragraph">
                3. To create Formatter, create a Folder named <span className="tomato">utils</span> on <span className="tomato">webapp Folder</span> and then create a File <span className="tomato">formatter.js</span> inside <span className="teal">utils</span> Folder.
            </p>

            
            <p className="paragraph">
                Create your Formatter like below.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
sap.ui.define([], function() {
    "use strict" ;

    return {
        FuelState : function(iValue){
            if(iValue === "Electric"){
                return "Success" ;
            }
            else if(iValue === "Petrol"){
                return "None" ;
            }
            else{
                return "Information" ;
            }
        }
    }
})
`
                }
            </SyntaxHighlighter>

            <p className="list bold pinky">
                And all set, we can use it as per your requirement.
            </p>

            
        </div>
    );
}

export default sample1;