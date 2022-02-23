DECLARE @Counter INT 
SET @Counter=1 --Start at region 1

WHILE (@Counter <=32) --analyze up to region 32
BEGIN
	--Select region_x_start, region_x_end, etc from Shooting_Regions table
	--this will define variables require to enclose region
	DECLARE @RID INT, @Rx1 INT, @Rx2 INT, @Ry1 INT, @Ry2 INT
	SELECT @RID = Region_id, @Rx1 = Region_x_start, @Rx2 = Region_x_end, @Ry1= Region_y_start, @Ry2 = Region_y_end
	FROM Shooting_Regions
	WHERE Region_id = @counter

	--To determine shooting percentage, shot and goal volume for each respective region are taken
	--Shot and goal volume are determined by counting shot occurence in each region
	--Note: ABS of shot_x and goal_x are taken since this would look at symmetric sides of the arena
	DECLARE @shot_vol float
	SELECT @shot_vol = count(Shot_x)  --Assuming all data is cleaned, should only need Shot_x or Shot_y
	FROM shotsdata
	Where  ABS(Shot_x) < @Rx1 AND ABS(Shot_x) > @Rx2 AND Shot_y < @Ry2 AND Shot_y > @Ry1 
	

	DECLARE @goal_vol Float
	SELECT @goal_vol = count(Goal_x)
	FROM goalsdata
	Where  ABS(Goal_x) < @Rx1 AND ABS(Goal_x) > @Rx2 AND Goal_y < @Ry2 AND Goal_y > @Ry1

	--Inserting into final Shooting_percentage table
	insert into Shot_Percentage_By_Region
	values(@RID, @Rx1, @Ry1, @Rx2, @Ry2, @shot_vol, @goal_vol, CAST(@goal_vol/@shot_vol*100 AS DECIMAL(8,2)))

    --Set counter to look at next region over
	Set @counter = @counter + 1
END

Select * from Shot_Percentage_By_Region
