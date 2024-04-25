
import { Button } from 'reactstrap';
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December']

export const shippingLineWithFreePool = shippingLine => {
    const shippingLines = ["ARK","HLC","ONE","YML"]
    return shippingLines.includes(shippingLine)

}

export const years = () => {
    let years = []
    for (let i = 2020; i < 2031; i++) {
        years.push(i.toString())
    }
    return years
}

export const refactorDate = date => {
    if(date !== null && date !== ''){
      date = date.split('T')
    date = date[0]
    date = date.split('-')
    date = date[2]+'-'+date[1]+'-'+date[0]
    return date
    }
    return date
  }
  const mapBooleanToString = boolean => {
      return boolean ? 'Yes': 'No'
  }
  const addCurrencytoValue = (value) => {
      return value+'€'
  }
  export const getTotalOfSumArray = (array,key) => {
    let total =  array.reduce((total,item) => total +item[key] ,0 )
    return addCurrencytoValue(parseFloat(total).toFixed(2))
  }
  export const getRoleNomination = role => {
      if(role ==='ADMIN') return 'Administrator'
      return 'User'
  }  

export const hlcFullTransshipmentColumns = () => {
    return (
        [
            {
                Header: 'Shipping Line',
                accessor: 'shippingLine',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Container',
                accessor: 'containerNumber',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Type',
                accessor: 'type',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Length',
                accessor: 'length',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'F/E',
                accessor: 'fullOrEmpty',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Invoice Category',
                accessor: 'invoiceCategory',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Reef',
                accessor: cell => mapBooleanToString(cell.reef),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Imdg',
                accessor: cell => mapBooleanToString(cell.imdg),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'OOG',
                accessor: cell => mapBooleanToString(cell.oog),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'DMG',
                accessor: cell => mapBooleanToString(cell.dmg),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Incoming Date',
                accessor: cell =>  refactorDate(cell.incDate),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Outgoing Date',
                accessor: cell =>  refactorDate(cell.outDate),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Duration',
                accessor: 'invoiceStorageDuration',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Reefer Surcharge',
                accessor: cell => addCurrencytoValue(cell.reeferSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Imdg Surcharge',
                accessor: cell => addCurrencytoValue(cell.imdgSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'OOG Surcharge',
                accessor: cell => addCurrencytoValue(cell.oogSurcharge) ,
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Dmg Surcharge',
                accessor: cell => addCurrencytoValue(cell.dmgSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Tank Surcharge',
                accessor: cell => addCurrencytoValue(cell.tankSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Total Surcharge',
                accessor: cell => addCurrencytoValue(cell.totalSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'First Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[0]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Second Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[1]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Third Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[2]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Fourth Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[3]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Total Revenue',
                accessor: cell => addCurrencytoValue(cell.totalStorageOfMonth),
                disableSortBy: true,
                filter: 'equals',
            }
            
        ]
    )
}

export const hlcFullDirectColumns = () => {
    return (
        [
            {
                Header: 'Shipping Line',
                accessor: 'shippingLine',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Container',
                accessor: 'containerNumber',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Type',
                accessor: 'type',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Length',
                accessor: 'length',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'F/E',
                accessor: 'fullOrEmpty',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Invoice Category',
                accessor: 'invoiceCategory',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Reef',
                accessor: cell => mapBooleanToString(cell.reef),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Imdg',
                accessor: cell => mapBooleanToString(cell.imdg),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'OOG',
                accessor: cell => mapBooleanToString(cell.oog),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'DMG',
                accessor: cell => mapBooleanToString(cell.dmg),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Incoming Date',
                accessor: cell =>  refactorDate(cell.incDate),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Outgoing Date',
                accessor: cell =>  refactorDate(cell.outDate),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Duration',
                accessor: 'invoiceStorageDuration',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Reefer Surcharge',
                accessor: cell => addCurrencytoValue(cell.reeferSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Imdg Surcharge',
                accessor: cell => addCurrencytoValue(cell.imdgSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'OOG Surcharge',
                accessor: cell => addCurrencytoValue(cell.oogSurcharge) ,
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Dmg Surcharge',
                accessor: cell => addCurrencytoValue(cell.dmgSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Tank Surcharge',
                accessor: cell => addCurrencytoValue(cell.tankSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Total Surcharge',
                accessor: cell => addCurrencytoValue(cell.totalSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'First Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[0]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Second Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[1]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Third Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[2]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Total Revenue',
                accessor: cell => addCurrencytoValue(cell.totalStorageOfMonth),
                disableSortBy: true,
                filter: 'equals',
            }
            
        ]
    )
}
export const othersFullTransshipmentColumns = () => {
    return (
        [
            {
                Header: 'Shipping Line',
                accessor: 'shippingLine',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Container',
                accessor: 'containerNumber',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Type',
                accessor: 'type',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Length',
                accessor: 'length',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'F/E',
                accessor: 'fullOrEmpty',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Invoice Category',
                accessor: 'invoiceCategory',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Reef',
                accessor: cell => mapBooleanToString(cell.reef),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Imdg',
                accessor: cell => mapBooleanToString(cell.imdg),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'OOG',
                accessor: cell => mapBooleanToString(cell.oog),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'DMG',
                accessor: cell => mapBooleanToString(cell.dmg),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Incoming Date',
                accessor: cell =>  refactorDate(cell.incDate),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Outgoing Date',
                accessor: cell =>  refactorDate(cell.outDate),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Duration',
                accessor: 'invoiceStorageDuration',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Reefer Surcharge',
                accessor: cell => addCurrencytoValue(cell.reeferSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Imdg Surcharge',
                accessor: cell => addCurrencytoValue(cell.imdgSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'OOG Surcharge',
                accessor: cell => addCurrencytoValue(cell.oogSurcharge) ,
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Dmg Surcharge',
                accessor: cell => addCurrencytoValue(cell.dmgSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Tank Surcharge',
                accessor: cell => addCurrencytoValue(cell.tankSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Total Surcharge',
                accessor: cell => addCurrencytoValue(cell.totalSurcharge),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'First Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[0]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Second Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[1]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Third Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[2]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Fourth Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[3]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Fifth Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[4]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Sixth Revenue',
                accessor: cell => addCurrencytoValue(cell.storageOfEachIntervalInMonth[5]),
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Total Revenue',
                accessor: cell => addCurrencytoValue(cell.totalStorageOfMonth),
                disableSortBy: true,
                filter: 'equals',
            }
            
        ]
    )
}

    export const emptyContainersColumns = () => {
        return (
            [
                {
                    Header: 'Day',
                    accessor: 'day',
                    disableSortBy: true,
                    filter: 'equals',
                },
                {
                    Header: 'Number Of Teus',
                    accessor: 'numberofTeus',
                    disableSortBy: true,
                    filter: 'equals',
                },
                {
                    Header: 'Price',
                    accessor: cell => addCurrencytoValue(cell.price),
                    disableSortBy: true,
                    filter: 'equals',
                }
            ]
        )
}

export const userColumns = (isMe,handleShow,handleDelete,handleEdit) => {
    return(
        [
            {
                Header: 'First Name',
                accessor: 'firstName',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Email',
                accessor: 'email',
                disableSortBy: true,
                filter: 'equals',
            },
            {
                Header: 'Role',
                accessor: 'role',
                disableSortBy: true,
                filter: 'equals',
                Cell: cell => getRoleNomination(cell.value)
            },
            {
                Header: 'More Actions',
                accessor:'id',
                disableFilters: true,
                Cell: (cell) => (<><Button color="primary" onClick={() => handleShow(cell.value)}><i class="fas fa-info-circle"></i></Button>
                {!isMe(cell.value) && <Button style={{marginLeft: '3%'}} color="warning" onClick={() => handleEdit(cell.value)}><i class="fas fa-edit"></i></Button>}
                {!isMe(cell.value) && <Button style={{marginLeft: '3%'}} color="danger" onClick={() => handleDelete(cell.value)}><i class="fas fa-trash"></i></Button> }
                </>
                )
                }
        ]
    )
}