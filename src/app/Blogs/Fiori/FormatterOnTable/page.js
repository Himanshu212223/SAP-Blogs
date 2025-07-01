"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    return (
        <main className='main'>
            <h1>Formatter on Table in Fiori UI5</h1>

            <div className='content'>

                <p>In this example, We will create a Table with Formatted Column Data like Fuel Type and Price column on below Table.</p>

                <Image src="/resources/formatter/formattedTable.png" width={600} height={300} alt="Formatter on Table" />

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create Table on View.</ol>
                    <ol>2. Define the Formatter on a Util Folder.</ol>
                    <ol>3. Import the Formatter on the View Controller.</ol>
                </ul>

                <h2>Step 1 - Create Table on View</h2>

                <p>In <span className='highlight'>view folder</span> create a Table and use <span className='highlight'>ObjectNumber Tag</span> for Column items.</p>

                <p>The reference of Column Item will look like below -</p>

                <CodeBlock code={`
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
/>`} language="xml" />

                <p>And the Table will look like below -</p>

                <CodeBlock code={`
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

</carTable:View>`} language="xml" />

                <h2>Step 2 - Define the Formatter on a Util Folder</h2>

                <p>Inside the <span className='highlight'>webapp Folder</span>, create a <span className='highlight'>utils Folder</span> and create <span className='highlight'>formatter.js</span> file inside it.</p>

                <p>The Formatter file content can be defined like below - </p>

                <CodeBlock code={`sap.ui.define([], function() {
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
})`} language='javascript' />

                <h2>Step 3 - Import the Formatter on the View Controller</h2>

                <p>In the Controller File and inside the view.controller file, declare the formatter and your controller file will look like below - </p>

                <CodeBlock code={`
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
`} language='javascript' />

                








                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;