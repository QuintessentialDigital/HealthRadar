// src/modules/subscriptions/subscription.controller.js
import Subscription from './subscription.model.js';

export async function createSubscription(req, res, next) {
  try {
    const { email, radarType, postcode, radiusMiles } = req.body;

    if (!email || !radarType || !postcode || !radiusMiles) {
      return res.status(400).json({
        ok: false,
        error: 'email, radarType, postcode and radiusMiles are required',
      });
    }

    const doc = await Subscription.create({
      userEmail: email,
      radarType,
      postcode,
      radiusMiles,
    });

    return res.status(201).json({
      ok: true,
      subscription: doc,
    });
  } catch (err) {
    next(err);
  }
}

export async function listSubscriptionsForEmail(req, res, next) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        ok: false,
        error: 'email query parameter is required',
      });
    }

    const subs = await Subscription.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    res.json({
      ok: true,
      subscriptions: subs,
    });
  } catch (err) {
    next(err);
  }
}
