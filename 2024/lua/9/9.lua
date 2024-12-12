local dump = require("dump")
local disk = {}
local blocks = {}
local blocks_2 = {}
local id = 0

for line in io.lines("input") do
	for digit in string.gmatch(line, ".") do
		table.insert(disk, tonumber(digit))
	end
end

for i = 1, #disk, 2 do
	local files, free_space = disk[i], disk[i + 1]

	local new_block = {}
	if files then
		local tmp = {}
		for _ = 1, files do
			table.insert(tmp, id)
		end
		table.insert(new_block, tmp)
	end
	if free_space then
		table.insert(new_block, free_space)
	else
		table.insert(new_block, 0)
	end

	table.insert(blocks, { files = new_block[1], free_space = new_block[2] })

	id = id + 1
end

local function part_one()
	local result = 0
	local head = {}
	local tail = blocks[#blocks]

	for i = 1, #blocks do
		head = blocks[i]
		if head then
			while head.free_space > 0 do
				if #tail.files > 0 then
					table.insert(head.files, table.remove(tail.files, #tail.files))
					head.free_space = head.free_space - 1
				else
					table.remove(blocks, #blocks)
					tail = blocks[#blocks]
				end
			end
		end
	end

	local count = 0
	for _, block in pairs(blocks) do
		for _, file in pairs(block.files) do
			result = result + count * file
			count = count + 1
		end
	end

	return result
end

id = 0
for i = 1, #disk, 2 do
	local files, free_space = disk[i], disk[i + 1]

	local new_block = {}
	if files then
		local tmp = {}
		for _ = 1, files do
			table.insert(tmp, id)
		end
		table.insert(new_block, tmp)
	end
	if free_space and tonumber(free_space) ~= 0 then
		local tmp = {}
		for _ = 1, free_space do
			table.insert(tmp, ".")
		end
		table.insert(new_block, tmp)
	end

	table.insert(blocks_2, { new_block[1], new_block[2] })

	id = id + 1
end

local function have_empty_blocks(list)
	for block_index, block in pairs(list) do
		if block[1] == "." then
			return block_index
		end
	end
	return 0
end

local function part_two()
	local result = 0
	local head = {}
	local tail = {}

	for i = #blocks_2, 1, -1 do
		tail = blocks_2[i]

		for _, tail_block in pairs(tail) do
			if tail_block[1] ~= "." then
				for j = 1, i do
					head = blocks_2[j]
					local empty_pos = have_empty_blocks(head)

					if empty_pos > 0 and #head[empty_pos] >= #tail_block then
						local new_empty_block = {}
						local new_block = {}
						for k = 1, #head[empty_pos] do
							if k <= #tail_block then
								table.insert(new_block, tail_block[k])
								tail_block[k] = "."
							else
								table.insert(new_empty_block, ".")
							end
						end
						head[empty_pos] = new_block
						if #new_empty_block > 0 then
							table.insert(head, empty_pos + 1, new_empty_block)
						end
						break
					end
				end
			end
		end
	end

	local count = 0
	for _, block in pairs(blocks_2) do
		for _, sub_block in pairs(block) do
			for _, file in pairs(sub_block) do
				if file ~= "." then
					result = result + count * file
				end
				count = count + 1
			end
		end
	end

	return result
end

print(part_one())
print(part_two())
