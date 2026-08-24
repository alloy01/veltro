const DocsItem = ({ item }) => {
    
    return (
        <tr className="border-b text-nowrap border-stone-800 hover:bg-stone-800/30 transition">
            <td className="py-1.5 px-2">{item.item_name}</td>
            <td className="py-1.5 px-2">{item.item_category}</td>
            <td className="py-1.5 px-2">{item.item_quantity}</td>
            <td className="py-1.5 px-2">{item.item_unit}</td>
            <td className="py-1.5 px-2">{item.item_supplier}</td>
            <td className="py-1.5 px-2">{item.item_status}</td>
            <td className="py-1.5 px-2">{item.item_costprice}</td>
        </tr>
    );
};

export default DocsItem;