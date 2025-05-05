import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { ItemDetails } from '../services/ItemDetails';
import { ShatterParser } from '../services/Shatter';

const router = express.Router();
const scraper = new ItemDetails();

// GET /api/details?item=NAME
const detailsRouter: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemName = req.query.item as string;
    
    if (!itemName) {
      res.status(400).json({ error: 'Item name is required' });
      return;
    }
    
    const itemDetails = await scraper.itemDetails(itemName);
    
    if (itemDetails.length === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    
    res.json(itemDetails);
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).json({ error: 'Failed to fetch item details' });
  }
};

// GET /api/shatter
const shatterRouter: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const shatterParser = new ShatterParser();
      
    const allShatter = await shatterParser.ParseItemTable();
    res.json(allShatter);
  } catch (error) {
    console.error('Error fetching shatter data:', error);
    res.status(500).json({ error: 'Failed to fetch shatter data' });
  }
};

router.get('/details', detailsRouter);
router.get('/shatter', shatterRouter);

export default router;