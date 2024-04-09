function deleteRoute(routeName) {
    let confirm=window.confirm(`Are you sure you want to delete this route( /${routeName} )?`);
    if (confirm){
        fetch(`/api/${routeName}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                window.location.reload();
            }
        })
    }else {
        console.log("deletetion was cancelled")
    }
}
