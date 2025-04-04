import { db } from "../database";
import { supabase } from "./client";

/**
 * Utility to migrate data from in-memory database to Supabase
 */
export const migrateToSupabase = async () => {
  try {
    console.log("Starting migration to Supabase...");

    // Migrate properties
    const properties = await db.getProperties();
    console.log(`Migrating ${properties.length} properties...`);

    for (const property of properties) {
      const { error } = await supabase.from("properties").insert({
        id: property.id,
        name: property.name,
        address: property.address,
        city: property.city,
        state: property.state,
        zip_code: property.zipCode,
        country: property.country,
        description: property.description,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        max_guests: property.maxGuests,
        price_per_night: property.pricePerNight,
        cleaning_fee: property.cleaningFee || 0,
        images: property.images || [],
        amenities: property.amenities || [],
        active: property.active,
        status: property.status,
        door_code: property.doorCode,
        wifi_password: property.wifiPassword,
        wifi_status: property.wifiStatus,
        rating: property.rating,
        location: property.location,
        created_at: property.createdAt,
        updated_at: property.updatedAt,
      });

      if (error) {
        console.error(`Error migrating property ${property.id}:`, error);
      }
    }

    // Migrate rooms
    const rooms = await db.getRooms();
    console.log(`Migrating ${rooms.length} rooms...`);

    for (const room of rooms) {
      const { error } = await supabase.from("rooms").insert({
        id: room.id,
        property_id: room.propertyId,
        name: room.name,
        type: room.type,
        description: room.description,
        count: room.count,
        image: room.image,
        created_at: room.createdAt,
        updated_at: room.updatedAt,
      });

      if (error) {
        console.error(`Error migrating room ${room.id}:`, error);
      }
    }

    // Migrate bookings
    const bookings = await db.getBookings();
    console.log(`Migrating ${bookings.length} bookings...`);

    for (const booking of bookings) {
      const { error } = await supabase.from("bookings").insert({
        id: booking.id,
        property_id: booking.propertyId,
        guest_name: booking.guestName,
        guest_email: booking.guestEmail,
        guest_phone: booking.guestPhone,
        check_in_date: booking.checkInDate,
        check_out_date: booking.checkOutDate,
        number_of_guests: booking.numberOfGuests,
        total_price: booking.totalPrice,
        status: booking.status,
        special_requests: booking.specialRequests,
        early_check_in: booking.earlyCheckIn,
        late_check_out: booking.lateCheckOut,
        created_at: booking.createdAt,
        updated_at: booking.updatedAt,
      });

      if (error) {
        console.error(`Error migrating booking ${booking.id}:`, error);
      }
    }

    // Migrate users
    const users = await db.getUsers();
    console.log(`Migrating ${users.length} users...`);

    for (const user of users) {
      const { error } = await supabase.from("users").insert({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address,
        profile_image: user.profileImage,
        last_login_at: user.lastLoginAt,
        active: user.active,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      });

      if (error) {
        console.error(`Error migrating user ${user.id}:`, error);
      }
    }

    // Migrate team members
    const teamMembers = await db.getTeamMembers();
    console.log(`Migrating ${teamMembers.length} team members...`);

    for (const member of teamMembers) {
      const { error } = await supabase.from("team_members").insert({
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.phone,
        role: member.role,
        active: member.active,
        hourly_rate: member.hourlyRate,
        start_date: member.startDate,
        documents: member.documents || [],
        notes: member.notes,
        profile_image: member.profileImage,
        availability: member.availability || {},
        created_at: member.createdAt,
        updated_at: member.updatedAt,
      });

      if (error) {
        console.error(`Error migrating team member ${member.id}:`, error);
      }
    }

    // Migrate tasks
    const tasks = await db.getTasks();
    console.log(`Migrating ${tasks.length} tasks...`);

    for (const task of tasks) {
      const { error } = await supabase.from("tasks").insert({
        id: task.id,
        property_id: task.propertyId,
        room_id: task.roomId,
        assigned_to_id: task.assignedToId,
        title: task.title,
        description: task.description,
        type: task.type,
        priority: task.priority,
        status: task.status,
        due_date: task.dueDate,
        completed_at: task.completedAt,
        completion_notes: task.completionNotes,
        verification_photos: task.verificationPhotos || [],
        created_at: task.createdAt,
        updated_at: task.updatedAt,
      });

      if (error) {
        console.error(`Error migrating task ${task.id}:`, error);
      }
    }

    // Migrate inventory items
    const inventoryItems = await db.getInventoryItems();
    console.log(`Migrating ${inventoryItems.length} inventory items...`);

    for (const item of inventoryItems) {
      const { error } = await supabase.from("inventory_items").insert({
        id: item.id,
        property_id: item.propertyId,
        room_id: item.roomId,
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        condition: item.condition,
        purchase_date: item.purchaseDate,
        purchase_price: item.purchasePrice,
        replacement_value: item.replacementValue,
        last_inspection_date: item.lastInspectionDate,
        warranty_info: item.warrantyInfo,
        serial_number: item.serialNumber,
        notes: item.notes,
        images: item.images || [],
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      });

      if (error) {
        console.error(`Error migrating inventory item ${item.id}:`, error);
      }
    }

    // Migrate team schedules
    const teamSchedules = await db.getTeamSchedules();
    console.log(`Migrating ${teamSchedules.length} team schedules...`);

    for (const schedule of teamSchedules) {
      const { error } = await supabase.from("team_schedules").insert({
        id: schedule.id,
        team_member_id: schedule.teamMemberId,
        property_id: schedule.propertyId,
        task_id: schedule.taskId,
        start_time: schedule.startTime,
        end_time: schedule.endTime,
        status: schedule.status,
        notes: schedule.notes,
        created_at: schedule.createdAt,
        updated_at: schedule.updatedAt,
      });

      if (error) {
        console.error(`Error migrating team schedule ${schedule.id}:`, error);
      }
    }

    // Migrate invoices
    const invoices = await db.getInvoices();
    console.log(`Migrating ${invoices.length} invoices...`);

    for (const invoice of invoices) {
      const { error } = await supabase.from("invoices").insert({
        id: invoice.id,
        booking_id: invoice.bookingId,
        property_id: invoice.propertyId,
        guest_name: invoice.guestName,
        guest_email: invoice.guestEmail,
        issue_date: invoice.issueDate,
        due_date: invoice.dueDate,
        total_amount: invoice.totalAmount,
        status: invoice.status,
        notes: invoice.notes,
        created_at: invoice.createdAt,
        updated_at: invoice.updatedAt,
      });

      if (error) {
        console.error(`Error migrating invoice ${invoice.id}:`, error);
      }

      // Migrate invoice line items for this invoice
      const lineItems = await db.getInvoiceLineItems(invoice.id);
      console.log(
        `Migrating ${lineItems.length} line items for invoice ${invoice.id}...`,
      );

      for (const lineItem of lineItems) {
        const { error: lineItemError } = await supabase
          .from("invoice_line_items")
          .insert({
            id: lineItem.id,
            invoice_id: lineItem.invoiceId,
            description: lineItem.description,
            quantity: lineItem.quantity,
            unit_price: lineItem.unitPrice,
            amount: lineItem.amount,
            created_at: lineItem.createdAt,
            updated_at: lineItem.updatedAt,
          });

        if (lineItemError) {
          console.error(
            `Error migrating invoice line item ${lineItem.id}:`,
            lineItemError,
          );
        }
      }
    }

    console.log("Migration completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, error };
  }
};
