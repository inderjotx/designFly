'use client'

import React, { useEffect, useState } from 'react'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export function Tags({ selected, setSelectedTags }: { selected: string[], setSelectedTags: React.Dispatch<string[]> }) {

    const [tags, setTags] = useState<string[] | []>([])

    useEffect(() => {

        const getTags = async () => {
            const data = await fetch('/api/get-tags')
            const jsonData = await data.json()
            console.log(jsonData)
            const tags = jsonData.map(({ name }: { name: string }) => name)
            setTags(tags)
        }

        getTags()

    }, [])


    function handleChange(value: string) {
        console.log(value)
        if (!(selected.includes(value))) {
            //@ts-ignore
            setSelectedTags((prev) => [...prev, value])
        }
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Tags" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>{tag.toUpperCase()}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
