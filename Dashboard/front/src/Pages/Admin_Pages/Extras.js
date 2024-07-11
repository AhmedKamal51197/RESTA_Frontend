import axios from "axios"

export default function Extras() {
    const getExtras= async () => {
        try{
            const extras=await axios.get("")
        }
        catch(error){

        }
    }

    function saveData(e) {
        e.preventDefault()

        // Save in database
    }
    return (
        <>
            <div className="db-pg">
                <h4 className="p-2"> Dashboard / Extras</h4>

                <div style={{ background: "#ffffff" }}>
                    <div className="table p-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5>Extras </h5>

                            </div>

                            <div>
                                {/* buttons */}
                                <button class="btn btn-primary rounded" type="button" data-bs-toggle="offcanvas" data-bs-target="#Extras-offcanvasRight" aria-controls="Extras-offcanvasRight"><i class="fa-solid fa-plus"></i> Add Item</button>

                                <div class="offcanvas offcanvas-end" tabindex="-1" id="Extras-offcanvasRight" aria-labelledby="Extras-offcanvasRightLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title" id="Extras-offcanvasRightLabel">Add  new Item</h5>
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
                                                    <label for="cost" class="form-label ml-2">Cost <sapan className="text-danger">*</sapan></label>
                                                    <input type="number" class="form-control ml-2" id="cost" required />
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

                                            <div class="mb-3">
                                                    <label for="desc" class="form-label">Description <sapan className="text-danger">*</sapan></label>
                                                    <input type="text-area" class="form-control" id="desc" required />
                                                </div>
                                            <button type="submit" class="btn btn-primary" onClick={(e) => saveData(e)}><i class="fa-regular fa-circle-check"></i> Save</button>                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <table class="table">
                            <thead>
                                <tr>
                                    <td scope="col" className=" text-secondary">Name</td>
                                    <td scope="col" className=" text-secondary">Cost</td>
                                    <td scope="col" className=" text-secondary">Status</td>
                                    <td scope="col" className=" text-secondary">Description</td>

                                    <td scope="col" className=" text-secondary">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>item-1</td>
                                    <td>4</td>
                                    <td>Active</td>
                                    <td>desc</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>

                                            {/* offCnvas */}
                                            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="fa-regular fa-pen-to-square"></i></button>

                                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Add  new item</h5>
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