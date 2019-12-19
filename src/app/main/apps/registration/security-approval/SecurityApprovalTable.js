import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";

// import Ag-grid module
import { AgGridReact } from "ag-grid-react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-balham.css";

// import @material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// import Redux
import * as Actions from "../store/actions";

// import utils
import * as Utils from "../../../../utils";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140
  },
  button: {
    marginTop: "14px"
  }
}));

const getLazyLoadingDataSet = (endRow, startRow) => {
  return new Promise((resolve, reject) => {
    Utils.xapi()
      .get(`/attendee-sas?page=${endRow / 50 - 1}&size=${50}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getAttendsCount = () => {
  return new Promise((resolve, reject) => {
    Utils.xapi()
      .get(`/attendee-sas/count`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

function SecurityApprovalTable(props, ref) {
  const mount = useRef(false);
  const dispatch = useDispatch();
  const [tableApi, setTableApi] = useState(null);

  useEffect(() => {
    mount.current = true;
    return () => {
      mount.current = false;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    exportToExcel: () => {
      const params = {
        columnWidth: 100,
        sheetName: '',
        exportMode: undefined,
        rowHeight: 30,
        headerRowHeight: 40,
      };

      tableApi && tableApi.exportDataAsExcel(params);
    }
  }))

  // Ag-grid options
  const columnDefs = [
    {
      headerName: "Attendee ID",
      field: "id",
      cellStyle: {
        padding: "15px",
        "font-size": "14px",
        "font-family": "sans-serif"
      },
      checkboxSelection: true
    },
    {
      headerName: "First Name",
      field: "firstName",
      cellStyle: {
        padding: "15px",
        "font-size": "14px",
        "font-family": "sans-serif",
        "margin-top": "10px"
      }
    },
    {
      headerName: "Last Name",
      field: "lastName",
      cellStyle: {
        padding: "15px",
        "font-size": "14px",
        "font-family": "sans-serif",
        "margin-top": "10px"
      }
    },
    {
      headerName: "Security Approval",
      cellRenderer: "secApprovalCellRenderer",
      cellStyle: {},
      sortable: false,
      filter: false
    },
    {
      headerName: "Action",
      cellRenderer: "actionCellRenderer",
      field: "action",
      cellStyle: {
        "margin-top": "5px",
        "text-align": "center"
      },
      suppressSizeToFit: true,
      sortable: false,
      filter: false
    },
    {
      headerName: "Email",
      field: "email",
      cellStyle: {
        padding: "15px",
        "font-size": "14px",
        "font-family": "sans-serif",
        "margin-top": "10px"
      }
    },
    {
      headerName: "Category",
      field: "category",
      cellStyle: {
        padding: "15px",
        "font-size": "14px",
        "font-family": "sans-serif",
        "margin-top": "10px"
      }
    },
    {
      headerName: "Company",
      field: "companyName",
      cellStyle: {
        padding: "15px",
        "font-size": "14px",
        "font-family": "sans-serif",
        "margin-top": "10px"
      }
    }
  ];

  const defs = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },
    sideBar: "columns",
    rowData: [],
    modules: AllModules,
    overlayLoadingTemplate:
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
    overlayNoRowsTemplate:
      '<span style="padding: 10px; border: 2px solid #444; background: #fafafa;">Loading ... </span>'
  };

  const frameworkComponents = {
    secApprovalCellRenderer: SecApprovalCellRenderer,
    actionCellRenderer: ActionCellRenderer
  };

  const getRowHeight = () => 80;
  const headerHeight = () => 32;

  // Ag-Grid event handler
  const onSelectionChanged = params => {
    const gridApi = params.api;
    const selectedRows = gridApi.getSelectedRows();
    dispatch(Actions.setSecSelectedRows(selectedRows));
  };

  const onGridReady = async params => {
    let count = await getAttendsCount();
    mount.current && setTableApi(params.api);
    const server = new FakeServer(count, dispatch);
    const dataSource = new ServerSideDataSource(server);
    params.api.setServerSideDatasource(dataSource);
  };

  return (
    <React.Fragment>
      <div
        className="table-responsive ag-theme-balham"
        style={{ height: "100%", width: "100%", fontSize: "14px" }}
      >
        <AgGridReact
          modules={defs.modules}
          columnDefs={columnDefs}
          defaultColDef={defs.defaultColDef}
          frameworkComponents={frameworkComponents}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={20}
          onSelectionChanged={onSelectionChanged}
          rowModelType={"serverSide"}
          cacheBlockSize={50}
          maxBlocksInCache={10}
          animateRows={true}
          onGridReady={onGridReady}
          getRowHeight={getRowHeight}
          headerHeight={headerHeight}
          overlayLoadingTemplate={defs.overlayLoadingTemplate}
          overlayNoRowsTemplate={defs.overlayNoRowsTemplate}
        ></AgGridReact>
      </div>
    </React.Fragment>
  );
}

/**
 * 
 * @param {object} server 
 * get data from the fake server
 * set data to ag-grid table
 */
function ServerSideDataSource(server) {
  return {
    getRows: async function (params) {
      var response = await server.getResponse(params.request);
      if (response.success) {
        params.successCallback(response.rows, response.lastRow);
      } else {
        params.failCallback();
      }
    }
  };
}

/**
 * 
 * @param {number} attendeesCount 
 * @param {object} dispatch 
 * fetch data from api
 * return fetched data to ag-grid datasource
 */
function FakeServer(attendeesCount, dispatch) {
  return {
    getResponse: async function (request) {
      // console.log("asking for rows: " + request.startRow + " to " + request.endRow);
      const lazyLoadingSet = await getLazyLoadingDataSet(
        request.endRow,
        request.startRow,
        attendeesCount
      );
      let lastRow = request.endRow <= attendeesCount ? -1 : attendeesCount;
      const rows = lazyLoadingSet.map(attendee => {
        return {
          ...attendee,
          category: (attendee.attendeeCategorySAS[0] && attendee.attendeeCategorySAS[0].categoryName) || "",
          secApproval: attendee.attendeeSecApprovalSAId || 0,
          secApprovalText: attendee.attendeeSecApprovalSAApprovalText || "No Text"
        };
      });
      dispatch(Actions.getSecAttendees(rows));
      return {
        success: true,
        rows,
        lastRow
      };
    }
  };
}

/**
 * 
 * @param {object} props 
 * takes ag-grid row data as props
 * return security approval select menu
 */
function SecApprovalCellRenderer(props) {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const prevSecApproval = useRef(data.secApproval);
  const secApprovals = Utils.objectToArray(
    useSelector(({ registerApp }) => registerApp.securityApproval.secApprovals)
  );
  const [secApproval, setSecApproval] = useState(data.secApproval);

  const onChangeSecApproval = e => {
    setSecApproval(e.target.value);
    if (prevSecApproval.current !== e.target.value) {
      // console.log('security approval is changed: ', data);
      dispatch(
        Actions.changeAttendeeIsSecurityChanged({
          attendeeId: data.id,
          secApproval: e.target.value,
          secApprovalText: secApprovals.filter(
            item => item.id === e.target.value
          )[0].approvalText
        })
      );
    }
  };

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Security Approval</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={secApproval}
          onChange={onChangeSecApproval}
        >
          {secApprovals &&
            secApprovals.map((item, index) => (
              <MenuItem key={index.toString()} value={item.id}>
                {item.approvalText}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

/**
 * 
 * @param {object} props 
 * takes ag-grid row data as props
 * return Approve button
 */
function ActionCellRenderer(props) {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const attendees = useSelector(
    ({ registerApp }) => registerApp.securityApproval.attendees
  );

  const onApproveSecurity = () => {
    const requestData = {
      ...attendees[data.id],
      attendeeSecApprovalSAId: data.secApproval,
      attendeeSecApprovalSAApprovalText: data.secApprovalText
    };
    Utils.xapi()
      .put("/attendee-sas", requestData)
      .then(response => {
        dispatch(Actions.updateSecAttendee(response.data));
      })
      .catch(error => {
        console.log("here update attendee security error: ", error);
      });
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onApproveSecurity}
      className={classes.button}
    >
      Approve
    </Button>
  );
}

// export default withReducer("registerApp", reducer)(SecurityApprovalTable);
export default forwardRef(SecurityApprovalTable);
