import { useEffect } from "react";


/* Hook personalizzato per cambiare il titolo della pagina
* @param title - Il nuovo titolo da assegnare alla pagina
*/

const useDocumentTitle = (title: string): void => {
    useEffect(()=>{
        document.title = title;
    }, [title]);
}

export default useDocumentTitle;