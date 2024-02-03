import { DesignCard } from "@/components/DesignCard"
import { prisma } from "@/lib/prismadb"



export default async function Page({ params }: { params: { saved: string, userId: string } }) {

    console.log(params)


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
                        Heart: true
                    }
                },
                user: true
            }

        })

        return (

            <div className="flex justify-center mt-14">


                <div className='grid  grid-cols-2 lg:grid-cols-4 gap-12 center'>
                    {

                        hearts.map(({ design, user }, index) => (
                            <div className='' key={index}>
                                <DesignCard design={design} creator={user} hearts={design.Heart} />
                            </div>
                        ))
                    }
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
                        Heart: true
                    }
                },
                user: true
            }

        })

        return (

            <div className="flex justify-center mt-14">


                <div className='grid  grid-cols-2 lg:grid-cols-4 gap-12 center'>
                    {

                        bookmarks.map(({ design, user }, index) => (
                            <div className='' key={index}>
                                <DesignCard design={design} creator={user} hearts={design.Heart} />
                            </div>
                        ))
                    }
                </div>
            </div>

        )
    }


} 