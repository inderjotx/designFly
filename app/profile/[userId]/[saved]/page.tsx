import { DesignCard } from "@/components/DesignCard"
import { prisma } from "@/lib/prismadb"



export default async function Page({ params }: { params: { saved: string, userId: string } }) {


    if (!params.userId) {
        return <div>This user does not  exist </div>
    }

    if (params.saved == "loved") {

        const hearts = await prisma.heart.findMany({
            where: {
                userId: params.userId
            },
            include: {
                design: {
                    include: {
                        Heart: true,
                        BookMark: true

                    }
                },
                user: true
            }

        })

        return (

            <div className="flex flex-col" >

                <div className=" mx-auto text-3xl mt-10" >
                    Liked
                </div>

                <div className="flex justify-center mt-14">

                    <div className='grid  grid-cols-1 md:grid-cols-3 px-10 lg:grid-cols-4 gap-12 center'>
                        {

                            hearts.map(({ design, user }, index) => (
                                <div className='' key={index}>
                                    <DesignCard bookmarks={design.BookMark} design={design} creator={user} hearts={design.Heart} />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

        )
    }
    else {

        const bookmarks = await prisma.bookMark.findMany({
            where: {
                userId: params.userId
            },
            include: {
                design: {
                    include: {
                        Heart: true,
                        BookMark: true
                    }

                },
                user: true
            }

        })

        return (

            <div className="flex flex-col" >

                <div className=" mx-auto text-3xl mt-10" >
                    Bookmarks
                </div>


                <div className="flex justify-center mt-14">
                    <div className='grid  grid-cols-1 md:grid-cols-3 px-10   lg:grid-cols-4 gap-12 center'>
                        {
                            bookmarks.map(({ design, user }, index) => (
                                <div className='' key={index}>
                                    <DesignCard bookmarks={design.BookMark} design={design} creator={user} hearts={design.Heart} />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>


        )
    }


} 