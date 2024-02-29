import Layout from "@/components/Layout"
import { Helmet } from "react-helmet"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import SearchBar from "@/components/SearchBar";
import { IoMdMore } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 43, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 237, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Orders = () => {
  const apiRef = useGridApiRef(); // this hook provides DataGrid context and can be used to manipulate it!

  return (
      <Layout>
          <Helmet>
              <title>Orders</title>
          </Helmet>

          <SearchBar />

          <div className='flex w-full items-center flex-col justify-center p-4 gap-3 bg-white rounded-lg'>
              <div className='flex justify-between items-center w-full'>
                  <h1 className='font-poppins-500 text-2xl text-tertiary'>
                      Recent orders
                  </h1>
                  {/* the three dot button */}
                  {/* <IoMdMore /> */}
                  <Popover.Root>
                      <Popover.Trigger asChild>
                          <button
                              className='rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white outline-1 outline-gray-200 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none'
                              aria-label='Update dimensions'>
                              <IoMdMore />
                          </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                          <Popover.Content
                              className='rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
                              sideOffset={5}>
                              <div className='flex flex-col gap-2.5'>
                                  <p className='text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5'>
                                      Dimensions
                                  </p>
                                  <fieldset className='flex gap-5 items-center'>
                                      <label
                                          className='text-[13px] text-violet11 w-[75px]'
                                          htmlFor='width'>
                                          Width
                                      </label>
                                      <input
                                          className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
                                          id='width'
                                          defaultValue='100%'
                                      />
                                  </fieldset>
                                  <fieldset className='flex gap-5 items-center'>
                                      <label
                                          className='text-[13px] text-violet11 w-[75px]'
                                          htmlFor='maxWidth'>
                                          Max. width
                                      </label>
                                      <input
                                          className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
                                          id='maxWidth'
                                          defaultValue='300px'
                                      />
                                  </fieldset>
                                  <fieldset className='flex gap-5 items-center'>
                                      <label
                                          className='text-[13px] text-violet11 w-[75px]'
                                          htmlFor='height'>
                                          Height
                                      </label>
                                      <input
                                          className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
                                          id='height'
                                          defaultValue='25px'
                                      />
                                  </fieldset>
                                  <fieldset className='flex gap-5 items-center'>
                                      <label
                                          className='text-[13px] text-violet11 w-[75px]'
                                          htmlFor='maxHeight'>
                                          Max. height
                                      </label>
                                      <input
                                          className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
                                          id='maxHeight'
                                          defaultValue='none'
                                      />
                                  </fieldset>
                              </div>
                              <Popover.Close
                                  className='rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default'
                                  aria-label='Close'>
                                  X
                              </Popover.Close>
                              <Popover.Arrow className='fill-white' />
                          </Popover.Content>
                      </Popover.Portal>
                  </Popover.Root>
              </div>

              <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                      pagination: {
                          paginationModel: {
                              pageSize: 5,
                          },
                      },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(rowIds) => console.log(rowIds)}
                  apiRef={apiRef}
                  className='w-full'
              />
          </div>
          {/* example of manipulating table via API */}
          {/* <h1 onClick={() => console.log(apiRef.current.getSelectedRows())}>asd</h1> */}
      </Layout>
  );
}

export default Orders