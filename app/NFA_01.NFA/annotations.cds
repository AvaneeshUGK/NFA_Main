using NFA_01Service as service from '../../srv/service';



annotate service.Source_Events with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Source Event Name',
            Value : Srcevtname,
            Criticality:#Information,
            CriticalityRepresentation : #WithoutIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Description',
            Value : Desc
        },
        {
            $Type : 'UI.DataField',
            Label : 'Created By',
            Value : Createdby,
            ![@UI.Hidden]
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'Status',
            Criticality : criticality
        },
        {
            $Type : 'UI.DataField',
            Label : 'Version',
            Value : Version,
            ![@UI.Importance] : #Medium
        },
    ]
);

annotate service.Source_Events with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Source Event Name',
                Value : Srcevtname,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : Desc,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'Questionnaire',
            ID : 'Questionnaire',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Questions',
                    ID : 'Questions',
                    Target : 'questionaire/@UI.LineItem#Questions',
                },],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Details',
            ID : 'Details',
            Target : 'questionaire/@UI.LineItem#Details',
        },
    ]
);
annotate service.Questionaire with @(
    UI.LineItem #Questionnaire : [
        {
            $Type : 'UI.DataField',
            Value : question,
            Label : 'question',
        },]
);
annotate service.Source_Events with @(
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject : 'PreviewAppHeaderDisplay',
            Action : 'display',
            Label : 'Preview',
            Mapping : [
                {
                    $Type : 'Common.SemanticObjectMappingType',
                    SemanticObjectProperty : 'event_id',
                    LocalProperty : event_id,
                },
            ],
        },
        {
            $Type : 'UI.DataFieldForIntentBasedNavigation',
            SemanticObject : 'VersionAssociationDisplay',
            Action : 'display',
            Label : 'Version',
        },]
);
annotate service.Source_Events with @(
    UI.FieldGroup #QuestForm : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : questionaire.Guruprasad,
                Label : 'Guruprasad',
            },{
                $Type : 'UI.DataField',
                Value : questionaire.question,
                Label : 'question',
            },],
    }
);
annotate service.Questionaire with @(
    UI.LineItem #Questions : []
);
annotate service.Source_Events with @(
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Comparison',
            ID : 'VendorComaprison',
            Target : '@UI.FieldGroup#VendorComaprison',
        },
    ],
    UI.FieldGroup #VendorComaprison : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Srcevtname,
                Label : 'Source Event Name',
            },{
                $Type : 'UI.DataField',
                Value : Desc,
                Label : 'Description',
            },],
    }
);
annotate service.Source_Events with @(
    UI.FieldGroup #Details : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : details.Itemname,
                Label : 'Itemname',
            },{
                $Type : 'UI.DataField',
                Value : details.Description,
                Label : 'Description',
            },{
                $Type : 'UI.DataField',
                Value : details.Quantity,
                Label : 'Quantity',
            },
            {
                $Type : 'UI.DataField',
                Value : details.Unit,
                Label : 'Unit',
            },{
                $Type : 'UI.DataField',
                Value : details.Guruprasad,
                Label : 'Guruprasad',
            },
            {
                $Type : 'UI.DataField',
                Value : details.Supplier_Demo2,
                Label : 'Supplier_Demo2',
            },],
    }
);
annotate service.Details with @(
    UI.LineItem #Details : []
);
annotate service.Source_Events with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
    }
);
annotate service.Source_Events with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    }
);
annotate service.Source_Events with @(
    UI.LineItem #tableView1 : [
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 2',
    }
);
annotate service.Details with @(
    UI.LineItem #Details1 : [
    ]
);
annotate service.Questionaire with @(
    UI.LineItem #Details : [
    ]
);
annotate service.Source_Events with {
    Version @Common.SemanticObject : 'VersionAssociationDisplay'
};
annotate service.Source_Events with {
    Version @Common.SemanticObjectMapping : [
        {
            $Type : 'Common.SemanticObjectMappingType',
            LocalProperty : event_id,
            SemanticObjectProperty : 'event_id'
        },
    ]
};
