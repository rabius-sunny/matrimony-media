
export default function Featured() {
    return <section className="bg-red-100">
        <div className="container">
            <h1 className="text-4xl mb-8 text-red-500">ফিচার্ড বায়োডাটা</h1>

            <div className="p-12 rounded-md">
                <div className="grid grid-cols-12 gap-8">
                    {
                        [1, 2, 3, 4, 5, 6].map(item => <div key={item} className="col-span-12 sm:col-span-6 lg:col-span-4">
                            <div className="h-60 rounded-md bg-red-600"></div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </section>
}
