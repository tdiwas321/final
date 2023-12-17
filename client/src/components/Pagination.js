const Pagination = ({postperpage,totalpost,paginate}) =>{
    const pagenumbers = [];

    for(let i=1;i<=Math.ceil(totalpost / postperpage); i++){
        pagenumbers.push(i);
    }
    return(
        <nav className="pagination-nav">
            <ul>
                {pagenumbers.map(number=>(
                    <li key={number}>
                        <button className="page-numbers" onClick={()=>paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination