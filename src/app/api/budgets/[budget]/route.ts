import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Budget from "@/models/newbudgets";

export const GET = async (request: NextRequest, context: { params: any }) => {
  try {
    await connect();
    const params = await context.params;
    const budgetId = params.budget;
    const budget = await Budget.find({ _id: budgetId });
    return NextResponse.json({
      message: "Budget detail",
      data: budget,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
};

export const PATCH = async (request: NextRequest, context: { params: any }) => {
  const params = await context.params;
  const budgetId = params.budget;

  try {
    const reqBody = await request.json();
    const { username, category, maximum, theme } = reqBody;
    await connect();
    const newmaximum = Number(maximum);
    const newBudget = await Budget.findOne({ _id: budgetId });

    if (!newBudget) {
      return new NextResponse(JSON.stringify({ message: "budget not found" }));
    }

    const upDatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      { username, category, maximum, theme },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "budget updated", budget: upDatedBudget }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: error,
    });
  }
};

export const DELETE = async (
  request: NextRequest,
  context: { params: any }
) => {
  try {
    await connect();
    const budgetId = await context.params;
    const budgetTobeDeleted = await Budget.findOne({ _id: budgetId.budget });

    if (!budgetTobeDeleted) {
      return new NextResponse(JSON.stringify({ message: "budget not found" }));
    }
    const deletedBudget = await Budget.findByIdAndDelete(budgetId.budget);
    if (deletedBudget) {
      return new NextResponse(
        JSON.stringify({ message: "budget deleted", budget: deletedBudget }),
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({
      message: error,
    });
  }
};
