import React from 'react'

function Tbodycomp({data,key}) {
  return (
    <tr >
                <td key={data.id}>{data.id}</td>
                <td><img width={150} height={120} src={data.image} alt='image introuvable'/></td>
                <td>{data.title}</td>
                <td>{data.price}</td>
                <td>{data.description.slice(0,155)}...</td>
                <td>{data.category}</td>
                <td>{data.rating.rate}</td>
    </tr>
  )
}

export default Tbodycomp