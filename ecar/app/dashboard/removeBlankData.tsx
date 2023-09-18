
function removeBlankData(data: any) {
    // If not blank, add data.item to newData array
    Object.entries(data).forEach(([key, value]) => {
        if (value === '') { delete data[key] }
        console.log(data)
    });
    return data
}

export default removeBlankData;