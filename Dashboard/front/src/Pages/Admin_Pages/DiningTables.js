
export default function DiningTables() {

    function saveData(e) {
        e.preventDefault()

        // Save in database
    }
    return (
        <>
            <div className="db-pg">
                <h4 className="p-2"> Dashboard / Dining Table</h4>

                <div style={{ background: "#ffffff" }}>
                    <div className="table p-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5>Dining Tables</h5>

                            </div>

                            <div>
                                {/* buttons */}
                                <button class="btn btn-primary rounded" type="button" data-bs-toggle="offcanvas" data-bs-target="#tablesOffcanvasRight" aria-controls="tablesOffcanvasRight"><i class="fa-solid fa-plus"></i> Add table</button>

                                <div class="offcanvas offcanvas-end" tabindex="-1" id="tablesOffcanvasRight" aria-labelledby="tablesOffcanvasRightLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title" id="tablesOffcanvasRightLabel">Add  new Table</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        <form>
                                            <div className="d-flex">
                                                <div class="mb-3">
                                                    <label for="name" class="form-label">Name <sapan className="text-danger">*</sapan></label>
                                                    <input type="text" class="form-control" id="name" required />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="size" class="form-label ml-2">Size <sapan className="text-danger">*</sapan></label>
                                                    <input type="number" class="form-control ml-2" id="size" required />
                                                </div>
                                            </div>
                                            <label for="status" class="form-label ml-2">Status <sapan className="text-danger">*</sapan></label>

                                            <div className="d-flex ">

                                                <div className="form-check pb-3 pr-5">
                                                    <input className="form-check-input" type="radio" name="status" id="active" checked />
                                                    <label className="form-check-label" for="active">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check pb-3">
                                                    <input className="form-check-input" type="radio" name="status" id="inactive" />
                                                    <label className="form-check-label" for="inactive">
                                                        Inactive
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary" onClick={(e) => saveData(e)}><i class="fa-regular fa-circle-check"></i> Save</button>                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <table class="table">
                            <thead>
                                <tr>
                                    <td scope="col" className=" text-secondary">NAME</td>
                                    <td scope="col" className=" text-secondary">SIZE</td>
                                    <td scope="col" className=" text-secondary">STATUS</td>
                                    <td scope="col" className=" text-secondary">ACTION</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Table-1</td>
                                    <td>4</td>
                                    <td>Active</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>

                                            {/* offCnvas */}
                                            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="fa-regular fa-pen-to-square"></i></button>

                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Add  new Table</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        <form>
                                            <div className="d-flex">
                                                <div class="mb-3">
                                                    <label for="name" class="form-label">Name <sapan className="text-danger">*</sapan></label>
                                                    <input type="text" class="form-control" id="name" required />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="size" class="form-label ml-2">Size <sapan className="text-danger">*</sapan></label>
                                                    <input type="number" class="form-control ml-2" id="size" required />
                                                </div>
                                            </div>
                                            <label for="status" class="form-label ml-2">Status <sapan className="text-danger">*</sapan></label>

                                            <div className="d-flex ">

                                                <div className="form-check pb-3 pr-5">
                                                    <input className="form-check-input" type="radio" name="status" id="active" checked />
                                                    <label className="form-check-label" for="active">
                                                        Active
                                                    </label>
                                                </div>
                                                <div className="form-check pb-3">
                                                    <input className="form-check-input" type="radio" name="status" id="inactive" />
                                                    <label className="form-check-label" for="inactive">
                                                        Inactive
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary" onClick={(e) => saveData(e)}><i class="fa-regular fa-circle-check"></i> Save</button>                                        </form>
                                    </div>
                                </div>
                                  {/* offCnvas */}

                                        </div>
                                    </td>
                                </tr>


                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
        </>
    )
}