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
            <h1>Search and Sort on Table in Fiori UI5</h1>

            <div className='content'>

                <p>In this example, We will perform Search and Sort Operation on Table.</p>

                <p>We will be following below steps for Search - </p>

                <ul className='list'>
                    <ol>1. Create Search Field on Table in View file.</ol>
                    <ol>2. Define Search Field Logic in Controller file.</ol>
                </ul>

                <h2>Step 1 - Create Search Field on Table in View file</h2>

                <p>In <span className='highlight'>View.xml</span> on Table, create OverflowToolbar for the SearchField.</p>

                <p>Refer the below code - </p>

                <CodeBlock code={`
<infoToolbar>
    <OverflowToolbar>

        <SearchField ariaLabelledBy="text1" id="maxPrice" liveChange="onSearch">
                <layoutData><OverflowToolbarLayoutData maxWidth="300px" shrinkable="true" priority="NeverOverflow"/></layoutData>
        </SearchField>

    </OverflowToolbar>
</infoToolbar>`} language="xml" />

                <h2>Step 2 - Define Search Field Logic in Controller file</h2>

                <p>In the <span className='highlight'>Controller.js</span> file and add the onSearch method on it.</p>

                <CodeBlock code={`
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

    /*	in the below line, if we provide andOperator as True, then whatever we 
    search should be present in all 3 path like if we search "abc" , then it will 
    show result iff abc is present in name, fuel_type and currency as well.
    */

    let andOperator = false ;
    
    let allFilters = new sap.ui.model.Filter(aFilter, andOperator) ;

    //  the id of the table is idProductsTable
    this.getView().byId("idProductsTable").getBinding("items").filter(allFilters) ;
}`} language="javascript" />


                <p>And Search Field and Login is done !!!</p>



                <h1>Sort Functionality</h1>

                <p>We will be following below steps for Sort - </p>

                <ul className='list'>
                    <ol>1. Create Sort Field on Table in View file.</ol>
                    <ol>2. Define Sort Field Logic in Controller file.</ol>
                </ul>

                <h2>Step 1 - Create Sort Field on Table in View file</h2>

                <p>In <span className='highlight'>View.xml</span> on Table, create OverflowToolbar for the Sort.</p>

                <p>Refer the below code - </p>

                <CodeBlock code={`
<infoToolbar>
    <OverflowToolbar>

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
</infoToolbar>`} language="xml" />

                <h2>Define Sort Field Logic in Controller file</h2>

                <CodeBlock code={`
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
}`} language="javascript" />

                <p>Here is how our <span className='highlight'>View.xml</span> file looks like.</p>

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
							<Text text="{CarModel>fuel_type}" />
							<Text text="{CarModel>seating_capacity}" />
							<Text text="{CarModel>price} {CarModel>currency}" />
						</cells>
					</ColumnListItem>
				</items>
			</Table>
        </content>
    </Page>
</carTable:View>`} language="xml" />




                <p>Here is how our <span className='highlight'>Controller.js</span> file looks like.</p>

                <CodeBlock code={`
sap.ui.define([
    "fiori/practice/controller/Controller",
	"sap/m/MessageToast"
] , (Controller, MessageToast) => {

    return Controller.extend("fiori.practice.controller.CarTable" , {

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

			/*	in the below line, if we provide andOperator as True, then whatever we search should be present 
                in all 3 path like if we search "abc" , then it will show result iff abc is present in name, 
                fuel_type and currency as well.
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

});`} language="javascript" />



            </div>

        </main>
    );
}

export default page;