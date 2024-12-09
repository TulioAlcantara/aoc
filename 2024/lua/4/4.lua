local file_name = "input"

local function get_rows()
	local rows = ""
	for line in io.lines(file_name) do
		rows = rows .. line .. "\n"
	end
	return rows
end

local function get_cols()
	local cols = {}
	local col_string = ""
	for line in io.lines(file_name) do
		for i = 1, #line do
			local char = line:sub(i, i)
			cols[i] = (cols[i] or "") .. char
		end
	end
	for _, col in ipairs(cols) do
		col_string = col_string .. col .. "\n"
	end

	return col_string
end

local function get_diagonals()
	local leftToRightDiagonal = ""
	local rightToLeftDiagonal = ""
	local lines = {}
	for line in io.lines(file_name) do
		table.insert(lines, line)
	end

	local numRows = #lines
	local numCols = #lines[1]

	for d = 1, numRows + numCols - 1 do
		for row = 1, numRows do
			local col = d - row + 1
			if col >= 1 and col <= numCols then
				leftToRightDiagonal = leftToRightDiagonal .. lines[row]:sub(col, col)
			end
		end
		leftToRightDiagonal = leftToRightDiagonal .. "\n"
	end

	for d = 1, numRows + numCols - 1 do
		for row = 1, numRows do
			local col = row + numCols - d
			if col >= 1 and col <= numCols then
				rightToLeftDiagonal = rightToLeftDiagonal .. lines[row]:sub(col, col)
			end
		end
		rightToLeftDiagonal = rightToLeftDiagonal .. "\n"
	end

	return leftToRightDiagonal, rightToLeftDiagonal
end

local function find_xmas(line)
	local result = 0
	for _ in string.gmatch(line, "XMAS") do
		result = result + 1
	end

	for _ in string.gmatch(line, "SAMX") do
		result = result + 1
	end
	return result
end

local function part_one()
	local result = 0

	local rows = get_rows()
	result = result + find_xmas(rows)

	local cols = get_cols()
	result = result + find_xmas(cols)

	local leftToRightDiagonal, rightToLeftDiagonal = get_diagonals()
	result = result + find_xmas(leftToRightDiagonal)
	result = result + find_xmas(rightToLeftDiagonal)

	return result
end

local function get_input_array()
	local input_array = {}

	for line in io.lines(file_name) do
		local char_array = {}
		for c in line:gmatch(".") do
			char_array[#char_array + 1] = c
		end

		table.insert(input_array, char_array)
	end

	return input_array
end

local function part_two()
	local result = 0
	local input_array = get_input_array()

	for i = 1, #input_array do
		for j = 1, #input_array[i] do
			if j > 1 and j < #input_array and i > 1 and i < #input_array then
				if input_array[i][j] == "A" then
					local top_left = input_array[i - 1][j - 1]
					local top_right = input_array[i - 1][j + 1]
					local bottom_left = input_array[i + 1][j - 1]
					local bottom_right = input_array[i + 1][j + 1]

					if
						(top_left == "M" and bottom_right == "S" or top_left == "S" and bottom_right == "M")
						and (top_right == "M" and bottom_left == "S" or top_right == "S" and bottom_left == "M")
					then
						result = result + 1
					end
				end
			end
		end
	end

	return result
end

print(part_one())
print(part_two())
