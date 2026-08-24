import { useState } from "react";

const Toast = ({ toastBlock,toastMessage }) => {

	return(
		<div className={`text-stone-200 absolute sm:max-w-96 max-w-72 bg-black/60 -right-104 sm:-right-96 transition-all duration-300 font-mono border-2 border-stone-200 top-12 px-6 py-2 ${toastBlock ? '-translate-x-108' : 'translate-x-0'}`}>
			{ toastMessage }
		</div>
	)
}

export default Toast;