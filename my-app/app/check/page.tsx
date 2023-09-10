const content = process.env.MONGODB_URI

function Check() {
    return ( 
     <p>{content}</p>
        );
}

export default Check;