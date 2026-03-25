type Props = {
  params: {
    id: string;
  };
};

const singleArticlePage = async ({params}: Props) => {   
    const { id } = await params;
    console.log(id);
    return (
        <div>
            <h1>First Post</h1>
            <p>{id}</p>
        </div>
    );
}

export default singleArticlePage;
