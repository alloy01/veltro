import DocsItem from "../components/DocsItem.jsx"

const DashTable = ({ loadedDocs }) => {

    return(
        <div className="bg-slate-400/10 w-full rounded-2xl border border-stone-100/20 h-fit py-2 px-4 overflow-x-auto"> 
            <div>
                <p className="text-stone-200 underline-offset-8 underline text-center text-lg">Items</p>
                <div className="py-4 overflow-x-auto">
                    {loadedDocs && loadedDocs.length > 0 ? (
                        <table className="w-full text-stone-200 font-mono">
                            <thead>
                                <tr className="border-b border-stone-500">
                                    <th className="text-left py-2 px-3">Name</th>
                                    <th className="text-left py-2 px-3">Category</th>
                                    <th className="text-left py-2 px-3">Quantity</th>
                                    <th className="text-left py-2 px-3">Unit</th>
                                    <th className="text-left py-2 px-3">Supplier</th>
                                    <th className="text-left py-2 px-3">Status</th>
                                    <th className="text-left py-2 px-3">Cost Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loadedDocs.map((item) => (
                                    <DocsItem key={item._id} item={item} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-stone-300 text-center">
                            No docs available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashTable;