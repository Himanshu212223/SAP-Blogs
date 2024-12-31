import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {


    return (
        <div className="indexing">
            <h1 className="headline">Search and Sort on Table in Fiori UI5.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will create Search and Sort option which operates on Table.
            </p>


            {/* STEPS to FOLLOW */}

            <h3 className="heading">Steps to follow to create Search Bar</h3>

            <p className="paragraph">
                Firstly, goto your <span className="tomato">view.xml</span> file and create the Search Bar on the Table. 
                </p>

            
            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<infoToolbar>
    <OverflowToolbar>

        <SearchField ariaLabelledBy="text1" id="maxPrice" liveChange="onSearch">
                <layoutData><OverflowToolbarLayoutData maxWidth="300px" shrinkable="true" priority="NeverOverflow"/></layoutData>
        </SearchField>

    </OverflowToolbar>
</infoToolbar>
                    `
                }
            </SyntaxHighlighter>



            <p className="paragraph">
                Now go to <span className="tomato">Controller.js</span> file and add the <span className="teal">onSearch</span> method on it.
            </p>

        

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
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
}
                    `
                }
            </SyntaxHighlighter>

            <p className="list bold pinky">
                And all set, we can use the Search Bar.
            </p>

            <br />
            <br />
            
            <h3 className="heading">Steps to follow to create Sort</h3>

            <p className="list">
                Go to <span className="tomato">view.xml</span> file and add Button on Table Header.
            </p>

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
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
</infoToolbar>
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
                Now go to <span className="tomato">Controller.js</span> file and add the <span className="teal">sorting and onReset method </span>.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
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

                    `
                }
            </SyntaxHighlighter>


            <p className="list bold pinky">
                And all set, we can use the Sorting.
            </p>

            
            <p className="list">
                Here is how our <span className="tomato">View.xml</span> file looks like.
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
							<Text text="{CarModel>fuel_type}" />
							<Text text="{CarModel>seating_capacity}" />
							<Text text="{CarModel>price} {CarModel>currency}" />
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

            <p className="list">
                Here is how our <span className="tomato">Controller.js</span> file looks like.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
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

});
                    `
                }
            </SyntaxHighlighter>
            
        </div>
    );
}

export default sample1;